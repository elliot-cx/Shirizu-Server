const studioTypeDefs = `#graphql
   type Studio {
      _id: ID!
      name: String!
   }

   type Query {
      getStudios: [Studio]!
      getStudio(id: ID!): Studio!
   }
`
export default studioTypeDefs;