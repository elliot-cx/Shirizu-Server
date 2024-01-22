import { Character, Shirizu } from "../../models";
import { Errors } from "../errors";

const shirizuResolver = {
    Query: {
        getShirizus: async (_, { }) => {
            return await Shirizu.find();
        },
        getShirizu: async (_, { id }) => {
            const shirizu = await Shirizu.findById(id);
            if (!shirizu) {
                throw Errors.SHIRIZU_NOT_FOUND;
            }
            return shirizu;
        }
    },
    Shirizu: {
        characters: async (shirizu) => await Character.find({ shirizu: shirizu._id }),
        
    }
}

export default shirizuResolver;