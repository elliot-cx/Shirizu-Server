const userTypeDefs = `#graphql
  "Define a user"
  type User {
    "The user id"
    _id: ID! 
    "The name of the user"
    name: String! 
    "The email of the user"
    email: String! 
    "The creation date of the user"
    createdAt: String
  }

  "Contain the access token and the refresh token"
  type AuthPayload {
    "The access jwt"
    accessToken: String 
    "The refresh jwt"
    refreshToken: String 
  }

  "Define the user input fields"
  input UserInput {
    "The name of the user"
    name: String!, 
    "The email of the user"
    email: String!, 
    "The password of the user"
    password: String! 
  }

  input LoginInput {
    "The email of the user"
    email: String!, 
    "The password of the user"
    password: String! 
  }

  type Query {
    "Get all users in the database"
    getUsers: [User], 
    "Get the user by it's ID"
    getUser(id: ID!): User 
  }

  type Mutation {
    "Register a new user in the database"
    registerUser(input: UserInput): ID, 
    "Login a user and give the tokens back"
    loginUser(input: LoginInput): AuthPayload 
  }
`;

export default userTypeDefs;