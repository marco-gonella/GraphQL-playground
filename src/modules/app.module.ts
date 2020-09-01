import { GraphQLModule } from '@graphql-modules/core';
import { UserModule } from './_user/user.module';
import { AuthModule } from './_auth/auth.module';


export default new GraphQLModule({
    imports: [AuthModule, UserModule]
});