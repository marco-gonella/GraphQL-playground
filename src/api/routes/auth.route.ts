import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthService from '../../services/auth.service';
import { IUserInputDTO } from '../../models/user';

const route = Router();

export default (app: Router) => {
    app.use('/auth', route);

    route.post(
        '/signup',
        async (req: Request, res: Response, next: NextFunction) => {
            const logger: any = Container.get('logger');
            logger.debug('Calling Sign-Up endpoint with body: %o', req.body)
            try {
                const authServiceInstance = Container.get(AuthService);
                const { user, token } = await authServiceInstance.SignUp(req.body as IUserInputDTO);
                return res.status(201).json({ user, token });
            } catch (e) {
                logger.error('error: %o', e);
                return next(e);
            }
        },
    );

    route.post(
        '/signin',
        async (req: Request, res: Response, next: NextFunction) => {
            const logger: any = Container.get('logger');
            logger.debug('Calling Sign-In endpoint with body: %o', req.body)
            try {
                const { username, password } = req.body;
                const authServiceInstance = Container.get(AuthService);
                const { user, token } = await authServiceInstance.SignIn(username, password);
                return res.json({ user, token }).status(200);
            } catch (e) {
                logger.error('error: %o', e);
                return next(e);
            }
        },
    );
};