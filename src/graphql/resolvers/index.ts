import characterResolver from "./character";
import episodeResolver from "./episode";
import genreResolver from "./genre";
import shirizuResolver from "./shirizu";
import studioResolver from "./studio";
import themeResolver from "./theme";
import userResolvers from "./user";

const resolvers = [
  userResolvers,
  characterResolver,
  episodeResolver,
  genreResolver,
  shirizuResolver,
  studioResolver,
  themeResolver
];

export default resolvers;