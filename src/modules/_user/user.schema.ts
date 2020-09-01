
import { gql } from 'apollo-server-express';

export default gql`

  type User {
    id: String!
    username: String!
    password: String!
    email: String!
    active: Boolean!
  }

  type Query {
    user(id: String!): User
    users: [User]
  }

  type Mutation {
    createUser(username: String!, password: String!, email: String): User
    updateUser(id:String!, username: String, email: String): User
    deleteUser(id:String!): User
    setStateUser(id:String!, active: Boolean!): User
  }

`;