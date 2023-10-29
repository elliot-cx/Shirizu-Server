import { model, Schema } from "mongoose";

const seriesStatusEnum = ['completed', 'ongoing'];

const shirizuSchema = new Schema({
   title: String, // Title of the shirizu
   status: { type: String, enum: seriesStatusEnum }, // Status from the enumeration
   totalEpisodes: Number, // Total number of planned episodes
   episodes: [{ type: Schema.Types.ObjectId, ref: 'Episode' }], // Reference to episodes in the shirizu
   sequel: [{ type: Schema.Types.ObjectId, ref: 'Shirizu' }], // Reference to sequel shirizu
   prequel: [{ type: Schema.Types.ObjectId, ref: 'Shirizu' }], // Reference to prequel shirizu
});

export default model('Shirizu', shirizuSchema);
