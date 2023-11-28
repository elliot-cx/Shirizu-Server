import { Studio } from "../../models";
import { Errors } from "../errors";

const studioResolver = {
    Query: {
        getStudios: async (_, { }) => {
            return await Studio.find();
        },
        getStudio: async (_, { id }) => {
            const studio = await Studio.findById(id);
            if (!studio) {
                throw Errors.STUDIO_NOT_FOUND;
            }
            return studio;
        }
    }
}

export default studioResolver;