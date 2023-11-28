import { User } from '../../models';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { Errors } from '../errors';

const userResolvers = {
   Query: {
      getUsers: async (_, { }) => {
         return await User.find();
      },
   },
   Mutation: {
      registerUser: async (_, { input: { name, email, password } }) => {
         // Find existing acccount
         const oldUser = await User.findOne({ email: email });
         if (oldUser) throw Errors.USER_ALREADY_EXIST_ERROR;

         // Adding user to the database
         const res = await new User({
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
         const foundUser = await User.findOne({ email: email })
         if (!foundUser) throw Errors.USER_NOT_FOUND_ERROR;

         // Check password
         const validPassword = await bcrypt.compare(password, foundUser.hashedPassword);
         if (!validPassword) throw Errors.INVALID_PASSWORD_ERROR;

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