import { model, Schema } from "mongoose";

const seriesStatusEnum = ['completed', 'ongoing'];

const shirizuSchema = new Schema({
   title: String, // Title of the shirizu
   alternativeTitles: [String], // Array of alternate titles
   status: { type: String, enum: seriesStatusEnum }, // Status from the enumeration
   totalEpisodes: Number, // Total number of planned episodes
   characters: [{ type: Schema.Types.ObjectId, ref: 'Character' }], 
   episodes: [{ type: Schema.Types.ObjectId, ref: 'Episode' }], // Reference to episodes in the shirizu
   provider: String, // Provider who added this shirizu (as a string)
   link: String, // Parent link
   genres: [{ type: Schema.Types.ObjectId, ref: 'Genre' }], // Reference to genres associated with this shirizu
   themes: [{ type: Schema.Types.ObjectId, ref: 'Theme' }], // Reference to themes associated with this shirizu
   recommendedAge: Number, // Recommended age for the shirizu
   animationStudios: [{ type: Schema.Types.ObjectId, ref: 'Studio' }], // Reference to animation studios associated with this shirizu
   description: String,
   sequel: { type: Schema.Types.ObjectId, ref: 'Shirizu' }, // Reference to sequel shirizu
   prequel: { type: Schema.Types.ObjectId, ref: 'Shirizu' }, // Reference to prequel shirizu
});

export default model('Shirizu', shirizuSchema);