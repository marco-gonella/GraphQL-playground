import { GraphQLModule } from '@graphql-modules/core';
import authSchema from './auth.schema';
import authResolver from './auth.resolver';

export const AuthModule = new GraphQLModule({
    typeDefs: authSchema,
    resolvers: authResolver
});