import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    createdAt: String
});

export default model('User', userSchema);