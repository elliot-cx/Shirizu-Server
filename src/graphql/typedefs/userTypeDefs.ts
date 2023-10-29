const userTypeDefs = `#graphql
  type User {
    _id: ID!
    name: String!
    email: String!
    createdAt: String
  }

  input UserInput{
    name: String!,
    email: String!,
    password: String!
  }

  type Query {
    getUsers: [User],
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(input: UserInput): String
  }
`;

export default userTypeDefs;