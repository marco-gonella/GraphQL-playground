
import { gql } from 'apollo-server-express';

export default gql`

  type AuthPayLoad {
    token: String!
    username: String!
  }

  type Mutation {
    createToken(username: String!, password: String!) : AuthPayLoad!
    verifyToken(token: String!): AuthPayLoad!
  }
  
`;