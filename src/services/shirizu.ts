
import { Types } from "mongoose";
import { Shirizu } from "../models"
import { IShirizu } from "../models/shirizu"


export namespace ShirizuService {
   export const AddShirizu = async (shirizu: IShirizu) => {
      const newShirizu = await new Shirizu({
         title: shirizu.title,
         alternativeTitles: shirizu.alternativeTitles,
         status: shirizu.status,
         totalEpisodes: shirizu.totalEpisodes,
         provider: shirizu.provider,
         link: shirizu.link,
         recommandedAge: shirizu.recommandedAge,
         description: shirizu.description,
      }).save();
      return newShirizu;
   }

   export const AddEpisode = async (shirizuId: Types.ObjectId, episodeId: Types.ObjectId) => {
      const existing = await Shirizu.findById(shirizuId);
      if (existing) {
         existing.episodes.push(episodeId);
         await existing.save();
      }else{
         throw new Error("Shirizu not found");
      }
   }

   export const AddCharacter = async (shirizuId: Types.ObjectId, characterId: Types.ObjectId) => {
      const existing = await Shirizu.findById(shirizuId);
      if (existing) {
         existing.characters.push(characterId);
         await existing.save();
      }else{
         throw new Error("Shirizu not found");
      }
   }

   export const AddGenre = async (shirizuId: Types.ObjectId, genreId: Types.ObjectId) => {
      const existing = await Shirizu.findById(shirizuId);
      if (existing) {
         existing.genres.push(genreId);
         await existing.save();
      }else{
         throw new Error("Shirizu not found");
      }
   }

   export const AddTheme = async (shirizuId: Types.ObjectId, themeId: Types.ObjectId) => {
      const existing = await Shirizu.findById(shirizuId);
      if (existing) {
         existing.themes.push(themeId);
         await existing.save();
      }else{
         throw new Error("Shirizu not found");
      }
   }

   export const AddStudio = async (shirizuId: Types.ObjectId, studioId: Types.ObjectId) => {
      const existing = await Shirizu.findById(shirizuId);
      if (existing) {
         existing.animationStudios.push(studioId);
         await existing.save();
      }else{
         throw new Error("Shirizu not found");
      }
   }

   

}