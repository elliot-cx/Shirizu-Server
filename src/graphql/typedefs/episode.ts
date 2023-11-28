const episodeTypeDefs = `#graphql
   type Episode {
      _id: ID!
      title: String!
      duration: String!
      image: String!
      videoUrl: String!
      shirizu: Shirizu
   }
   
   type Query {
      getEpisodes: [Episode]!
      getEpisode(id: ID!): Episode!
   }
`;

export default episodeTypeDefs;