import { GraphQLError } from "graphql";

export namespace Errors {
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

   export const EPISODE_NOT_FOUND = new GraphQLError("This episode doesn't exist",{
      extensions: {
         code: 'EPISODE_NOT_FOUND'
      }
   });

   export const SHIRIZU_NOT_FOUND = new GraphQLError("This shirizu doesn't exist",{
      extensions: {
         code: 'SHIRIZU_NOT_FOUND'
      }
   });

   export const CHARACTER_NOT_FOUND = new GraphQLError("This character doesn't exist",{
      extensions: {
         code: 'CHARACTER_NOT_FOUND'
      }
   });

   export const STUDIO_NOT_FOUND = new GraphQLError("This studio doesn't exist",{
      extensions: {
         code: 'STUDIO_NOT_FOUND'
      }
   });

   export const GENRE_NOT_FOUND = new GraphQLError("This genre doesn't exist",{
      extensions: {
         code: 'GENRE_NOT_FOUND'
      }
   });

   export const THEME_NOT_FOUND = new GraphQLError("This theme doesn't exist",{
      extensions: {
         code: 'THEME_NOT_FOUND'
      }
   });
}