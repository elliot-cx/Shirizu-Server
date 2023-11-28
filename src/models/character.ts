import { model, Schema } from "mongoose";

const genreSchema = new Schema({
   name: String, // Name of the character
   img: String, // Url of the image
   shirizu: [{ type: Schema.Types.ObjectId, ref: 'Shirizu' }]
});

export default model('Character', genreSchema);