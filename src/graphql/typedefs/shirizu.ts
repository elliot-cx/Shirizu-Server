const shirizuTypeDefs = `#graphql
  type Shirizu {
    _id: ID!
    title: String!
    status: String
    totalEpisodes: Int
    episodes: [Episode]
    sequel: [Shirizu]
    prequel: [Shirizu]
  }

  input ShirizuInput {
    title: String!
    status: String
    totalEpisodes: Int
    episodes: [ID]
    sequel: [ID]
    prequel: [ID]
  }

  type Query {
    getShirizus: [Shirizu]
    getShirizu(id: ID!): Shirizu
  }

  type Mutation {
    createShirizu(input: ShirizuInput): Shirizu
    updateShirizu(id: ID!, input: ShirizuInput): Shirizu
    deleteShirizu(id: ID!): ID
  }
`;

export default shirizuTypeDefs;
