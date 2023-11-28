import { model, Schema } from "mongoose";

const studioSchema = new Schema({
   name: String, // Name of the animation studio
});

export default model('Studio', studioSchema);
