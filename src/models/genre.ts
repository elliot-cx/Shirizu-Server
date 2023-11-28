import { model, Schema } from "mongoose";

const genreSchema = new Schema({
   name: String, // Name of the genre
});

export default model('Genre', genreSchema);