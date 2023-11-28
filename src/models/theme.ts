import { model, Schema } from "mongoose";

const themeSchema = new Schema({
   name: String,
});

export default model('Theme', themeSchema);