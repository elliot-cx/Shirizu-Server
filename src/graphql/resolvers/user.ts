import user from "../../models/user";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { INVALID_PASSWORD_ERROR, USER_ALREADY_EXIST_ERROR, USER_NOT_FOUND_ERROR } from "../errors";

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
         if (oldUser) throw USER_ALREADY_EXIST_ERROR;

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
         const foundUser = await user.findOne({ email: email })
         if (!foundUser) throw USER_NOT_FOUND_ERROR;

         // Check password
         const validPassword = await bcrypt.compare(password, foundUser.hashedPassword);
         if (!validPassword) throw INVALID_PASSWORD_ERROR;

         // Generating tokens
         const accessToken = jwt.sign(
            { sub: foundUser._id },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
         );

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