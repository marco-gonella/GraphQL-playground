import { Service, Inject } from 'typedi';
// import MailerService from './mailer.service';
import { IUser, IUserInputDTO, User } from '../models/user';
import { createToken } from '../loaders/jwt';
import bcrypt from 'bcrypt';

@Service()
export default class AuthService {
    constructor(
        // private mailer: MailerService,
        @Inject('logger') private logger
    ) { }

    public async SignUp(userInputDTO: IUserInputDTO): Promise<{ user: IUser, token: string }> {
        try {
            const { username, email, password } = userInputDTO;
            const BCRYPT_SALT_ROUNDS = 12;

            const user = await User.findOne({ username });
            if (user) {
                throw new Error('User already exist');
            }

            const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
            const newUser = await new User({
                username,
                email,
                password: hashedPassword,
                active: true
            });
            await newUser.save();

            // send mail
            // this.logger.silly('Sending welcome email');
            // await this.mailer.SendWelcomeEmail(newUser);

            return { user: newUser.toObject(), token: createToken(username, password)
            };




            // this.logger.silly('Hashing password');
            // const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
            // this.logger.silly('Creating user db record');
            // const userRecord = await this.userModel.create({
            //     ...userInputDTO,
            //     salt: salt.toString('hex'),
            //     password: hashedPassword,
            // });
            // this.logger.silly('Generating JWT');
            // const token = this.generateToken(userRecord);

            // if (!userRecord) {
            //     throw new Error('User cannot be created');
            // }
            // this.logger.silly('Sending welcome email');
            // await this.mailer.SendWelcomeEmail(userRecord);

            // /**
            //  * @TODO This is not the best way to deal with this
            //  * There should exist a 'Mapper' layer
            //  * that transforms data from layer to layer
            //  * but that's too over-engineering for now
            //  */
            // const user = userRecord.toObject();
            // Reflect.deleteProperty(user, 'password');
            // Reflect.deleteProperty(user, 'salt');
            // return { user, token };
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    public async SignIn(username: string, password: string): Promise<{ user: IUser; token: string }> {

        const user: any = await User.findOne({ username });

        if (!user) {
            throw new Error('User not registered');
        }

        if (bcrypt.compare(password, user.password)) {
            return { user: user.toObject(), ...createToken(username, password)}
        } else {
            throw new Error('Invalid Password');
        }

        // const userRecord = await this.userModel.findOne({ email });
        // if (!userRecord) {
        //     throw new Error('User not registered');
        // }
        // /**
        //  * We use verify from argon2 to prevent 'timing based' attacks
        //  */
        // this.logger.silly('Checking password');
        // const validPassword = await argon2.verify(userRecord.password, password);
        // if (validPassword) {
        //     this.logger.silly('Password is valid!');
        //     this.logger.silly('Generating JWT');
        //     const token = this.generateToken(userRecord);

        //     const user = userRecord.toObject();
        //     Reflect.deleteProperty(user, 'password');
        //     Reflect.deleteProperty(user, 'salt');
        //     /**
        //      * Easy as pie, you don't need passport.js anymore :)
        //      */
        //     return { user, token };
        // } else {
        //     throw new Error('Invalid Password');
        // }
    }
}