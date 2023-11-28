const characterTypeDefs = `#graphql
   type Character {
      _id: ID!
      name: String!
      img: String!
   }

   type Query {
      getCharacters: [Character]!
      getCharacter(id: ID!): Character!
   }
`
export default characterTypeDefs;