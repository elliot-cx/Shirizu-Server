const themeTypeDefs = `#graphql
   type Theme {
      _id: ID!
      name: String!
   }

   type Query {
      getThemes: [Theme]!
      getTheme(id: ID!): Theme!
   }
`

export default themeTypeDefs;