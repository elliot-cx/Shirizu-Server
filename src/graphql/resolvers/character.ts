import { Character } from "../../models";
import { Errors } from "../errors";

const characterResolver = {
    Query: {
        getCharacters: async (_, { }) => {
            return await Character.find();
        },
        getCharacter: async (_, { id }) => {
            const character = await Character.findById(id);
            if (!character) {
                throw Errors.CHARACTER_NOT_FOUND;
            }
            return character;
        }
    }
}

export default characterResolver;