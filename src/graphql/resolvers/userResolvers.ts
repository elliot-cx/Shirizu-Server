import { GraphQLError } from "graphql";
import user from "../../models/user";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const userResolvers = {
   Query: {
      getUsers: async (_, { }) => {
         return await user.find();
      },
   },
   Mutation: {
      registerUser: async (_, { input: { name, email, password } }) => {
         // Find existing acccount
         const oldUser = await user.findOne({ email: email });

         if (oldUser) {
            throw new GraphQLError(`A user is already registered with the email '${email}'`, {
               extensions: {
                  code: 'USER_ALREADY_EXIST'
               }
            });
         }

         // Adding user to the database
         const res = await new user({
            name: name,
            email: email,
            hashedPassword: bcrypt.hashSync(password),
            createdAt: new Date().toISOString()
         }).save();

         // Return user created ID
         return res._id;
      },
      loginUser: async (_, { input: { email, password } }) => {
         // Search user
         const foundUser = await user.findOne({ email });
         if (!foundUser) {
            throw new GraphQLError(`User not found`, {
               extensions: {
                  code: 'USER_NOT_FOUND'
               }
            });
         }

         // Check password
         const validPassword = await bcrypt.compare(password, foundUser.hashedPassword);
         if (!validPassword) {
            throw new GraphQLError(`Invalid password`, {
               extensions: {
                  code: 'INVALID_PASSWORD'
               }
            });
         }

         // Generating the access token
         const accessToken = jwt.sign(
            { sub: foundUser._id },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
         );

         // Generating the refresh token
         const refreshToken = jwt.sign(
            { sub: foundUser._id },
            process.env.SECRET_KEY,
            { expiresIn: '7d' }
         );

         // Return tokens
         return { accessToken, refreshToken };
      }
   }
};

export default userResolvers;