import { Shirizu } from "../../models";
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
    }
}

export default shirizuResolver;