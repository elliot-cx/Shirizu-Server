import { model, Schema, Types } from "mongoose";

interface IGenre {
   name: string;
   img: string;
   shirizu: Types.ObjectId;
}

const genreSchema = new Schema({
   name: String, // Name of the character
   img: String, // Url of the image
   shirizu: [{ type: Schema.Types.ObjectId, ref: 'Shirizu' }]
});

export default model<IGenre>('Character', genreSchema);