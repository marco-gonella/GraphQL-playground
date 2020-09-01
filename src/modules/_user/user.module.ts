import { GraphQLModule } from '@graphql-modules/core';
import userSchema from './user.schema';
import userResolver from './user.resolver';

export const UserModule = new GraphQLModule({
    typeDefs: userSchema,
    resolvers: userResolver
});
