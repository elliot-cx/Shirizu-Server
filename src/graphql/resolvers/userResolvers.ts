import user from "../../models/user";
import bcrypt from 'bcryptjs';

const userResolvers = {
    Query: {
        getUsers: async (_, { }) => {
            return await user.find();
        },
    },
    Mutation: {
        createUser: async (_, { input: { name, email, password } }) => {
            const res = await new user({
                name: name,
                email: email,
                hashedPassword: bcrypt.hashSync(password),
                createdAt: new Date().toISOString()
            }).save();

            return res._id;
        },
    }
};

export default userResolvers;
