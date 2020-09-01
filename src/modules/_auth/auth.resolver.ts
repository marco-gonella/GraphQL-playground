import { createToken, verifyToken } from "../../loaders/jwt";

export default {
    Mutation: {

        createToken: async (root, args, context) => {
            const { username, password } = args;
            return { token: createToken(username, password) };
        },

        verifyToken: async (root, args, context) => {
            const { token } = args;
            return verifyToken(token);
        }
    }
};