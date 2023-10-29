import { GraphQLError } from "graphql";

export const USER_ALREADY_EXIST_ERROR = new GraphQLError("A user is already registered with the email provided", {
   extensions: {
      code: 'USER_ALREADY_EXIST'
   }
});

export const USER_NOT_FOUND_ERROR = new GraphQLError("User not found", {
   extensions: {
      code: 'USER_NOT_FOUND'
   }
});

export const INVALID_PASSWORD_ERROR = new GraphQLError("Invalid password", {
   extensions: {
      code: 'INVALID_PASSWORD'
   }
});