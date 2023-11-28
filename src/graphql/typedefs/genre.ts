const genreTypeDefs = `#graphql
   type Genre {
      _id: ID!
      name: String!
   }

   type Query {
      getGenres: [Genre]!
      getGenre(id: ID!): Genre!
   }
`

export default genreTypeDefs;