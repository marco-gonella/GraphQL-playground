import jsonWebToken from 'jsonwebtoken';

import { AuthenticationError } from 'apollo-server-express';

import config from '../config/config';

export const createToken = (username, password) => {
    try {
        // here you will add actual database call to validate username/password
        return jsonWebToken.sign({ username, password }, config.jwtSecret);
    } catch (e) {
        throw new AuthenticationError(
            'Authentication token is invalid, please log in',
        )
    }
}

export const verifyToken = (token) => {
    try {
        const { username } = jsonWebToken.verify(token, config.jwtSecret);
        return { username, token };
    } catch (e) {
        throw new AuthenticationError(
            'Authentication token is invalid, please log in',
        );
    }
}