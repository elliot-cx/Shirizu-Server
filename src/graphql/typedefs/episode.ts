const episodeTypeDefs = `#graphql
  type Episode {
    _id: ID!
    title: String!
    duration: String!
    image: String!
    videoUrl: String!
    series: Shirizu
  }

  input EpisodeInput {
    title: String!
    duration: String!
    image: String!
    videoUrl: String!
    series: ID!
  }

  type Query {
    getEpisodes: [Episode]
    getEpisode(id: ID!): Episode
  }

  type Mutation {
    createEpisode(input: EpisodeInput): Episode
    updateEpisode(id: ID!, input: EpisodeInput): Episode
    deleteEpisode(id: ID!): ID
  }
`;

export default episodeTypeDefs;
