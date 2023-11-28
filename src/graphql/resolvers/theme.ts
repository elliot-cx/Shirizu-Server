import { Theme } from "../../models";
import { Errors } from "../errors";

const themeResolver = {
    Query: {
        getThemes: async (_, { }) => {2
            return await Theme.find();
        },
        getTheme: async (_, { id }) => {
            const theme = await Theme.findById(id);
            if (!theme) {
                throw Errors.THEME_NOT_FOUND;
            }
            return theme;
        }
    }
}

export default themeResolver;