import { Genre } from "../../models";
import { Errors } from "../errors";

const genreResolver = {
    Query: {
        getGenres: async (_, { }) => {
            return await Genre.find();
        },
        getGenre: async (_, { id }) => {
            const genre = await Genre.findById(id);
            if (!genre) {
                throw Errors.GENRE_NOT_FOUND
            }
            return genre;
        }
    }
}

export default genreResolver;