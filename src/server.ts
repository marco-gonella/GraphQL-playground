import express, { Application } from "express";
import bodyParser from 'body-parser';
// import { schema } from './models/schema';
import loader from './loaders/_index';
import config from './config/config';
import { ApolloServer } from 'apollo-server-express';

import { verifyToken } from "./loaders/jwt";
import appModule from "./modules/app.module";
import Logger from './loaders/logger';
import chalk from 'chalk';
import figlet from 'figlet';

export class Server {

    app: Application;
    server: ApolloServer;
    serverIql: ApolloServer;

    constructor(port: number) {
        console.log(
            chalk.redBright(
                figlet.textSync(` GraphQL \n Playground`, {
                    horizontalLayout: 'default',
                    font: 'Doom'
                })
            )
        );

        this.app = express();

        loader({ expressApp: this.app });

        this.configureServer();

        this.listen(port);
    }

    private configureServer(): void {

        const { schema } = appModule;

        // graphql API
        this.server = new ApolloServer({
            schema,
            introspection: false,
            playground: false,
            tracing: true,
            context: ({ req }) => {

                // Get the user token from the headers.
                const authorization = req.headers.authorization || '';
                let token = authorization;

                if (/Bearer /.test(authorization)) {
                    let [_, splittedToken] = authorization.split('Bearer ');
                    token = splittedToken;
                }

                verifyToken(token);

                // add the user to the context
                return { token };
            }
        });

        this.server.applyMiddleware({ app: this.app, path: "/api/graphql" });

        // graphql playground

        if (config.usePlayground) {
            this.serverIql = new ApolloServer({
                schema,
                introspection: true,
                playground: {
                    settings: <any>config.playground
                }
            });

            this.serverIql.applyMiddleware({ app: this.app, path: "/graphql" });
        }

    }

    public listen(port): void {
        this.app.listen(config.port, () => {

            Logger.info(`Server listening on port: ${port}`);
            if (config.usePlayground)
                Logger.info('apollo interface on /graphql');

            Logger.info('api on /api/graphql')
        });
    }
}