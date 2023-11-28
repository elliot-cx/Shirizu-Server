import { Episode } from "../../models";
import { Errors } from "../errors";

const episodeResolver = {
    Query: {
        getEpisodes: async (_, { }) => {
            return await Episode.find();
        },
        getEpisode: async (_, { id }) => {
            const episode = await Episode.findById(id);
            if (!episode) {
                throw Errors.EPISODE_NOT_FOUND
            }
            return episode;
        }
    }
}

export default episodeResolver;