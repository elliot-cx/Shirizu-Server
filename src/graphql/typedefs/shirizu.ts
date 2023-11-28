const shirizuTypeDefs = `#graphql
   type Shirizu {
      _id: ID!
      title: String!
      alternativeTitles: [String]!
      status: String!
      totalEpisodes: Int!
      characters: [Character]!
      episodes: [Episode]!
      genres: [Genre]!
      themes: [Theme]!
      recommendedAge: Int!
      animationStudios: [Studio]!
      description: String!
      sequel: [Shirizu]!
      prequel: [Shirizu]!
   }

   type Query {
      getShirizus: [Shirizu]!
      getShirizu(id: ID!): Shirizu!
   }
`;

export default shirizuTypeDefs;