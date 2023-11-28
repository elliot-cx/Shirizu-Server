import { model, Schema } from "mongoose";

const episodeSchema = new Schema({
   number: Number,
   title: String, // Title of the episode
   duration: String, // Duration of the episode
   image: String, // URL of the episode image
   videoUrl: String, // URL of the episode video
   shirizu: { type: Schema.Types.ObjectId, ref: 'Shirizu' }, // Reference to the shirizu to which this episode belongs
});

export default model('Episode', episodeSchema);