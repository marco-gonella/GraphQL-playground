
import { UserInputError, ApolloError } from 'apollo-server-express';
import { User } from '../../models/user';
import bcrypt from 'bcrypt';
import { clearObject } from '../../utilities/utilities';
import { returnNewResult } from '../../loaders/mongoose';

const BCRYPT_SALT_ROUNDS = 12;

export default {
    Query: {
        async user(parent, args, context) {

            const user = await User.findById(args.id);
            if (!user) {
                throw new UserInputError('could not find any user with given id', {
                    data: args
                });
            }
            return user;
        },
        async users(parent, args, context) {
            return User.find({});
        }
    },
    Mutation: {
        async createUser(parent, args, context) {
            const { username, email, password } = args;
            const user = await User.findOne({ username });
            if (user) {
                throw new UserInputError('Username already exist', {
                    data: args
                });
            }

            const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
            const newUser = await new User({
                username,
                email,
                password: hashedPassword,
                active: true
            });
            return await newUser.save();
        },
        async updateUser(parent, args, context) {

            const { id, email, username } = args;

            const update = clearObject({ email, username });

            try {
                const user = await User.findOneAndUpdate({ _id: id }, update, returnNewResult)
                return user.toObject();
            } catch (e) {
                throw new ApolloError(`User id: ${id} `, e);
            }

        },
        async deleteUser(parent, args, context) {
            const { id } = args;
            try {
                const user = await User.findOneAndDelete({ _id: id });
                return user.toObject();
            } catch (e) {
                throw new ApolloError(`User id: ${id} user not found`, e);
            }

        },
        async setStateUser(parent, args, context) {
            const { id, active } = args;
            try {
                const user = await User.findOneAndUpdate({ _id: id }, { active }, returnNewResult)
                return user.toObject();
            } catch (e) {
                throw new ApolloError(`User id: ${id} `, e);
            }

        }
    }
};