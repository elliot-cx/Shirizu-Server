import 'dotenv/config';
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import chalk from 'chalk';
import typeDefs from './graphql/typedefs';
import resolvers from './graphql/resolvers';

const server = new ApolloServer({
   typeDefs: typeDefs,
   resolvers: resolvers,
   formatError: (error) => {
      const { extensions: { code, ...restExtensions }, message } = error;
      return {
         message,
         extensions: { code },
      };
   }
});

mongoose.connect(process.env.MONGODB)
   .then(() => {
      console.log(chalk.green("[✓]"), "MongoDB connection successful");
      return startStandaloneServer(server, {
         listen: { port: parseInt(process.env.APOLLO_PORT) }
      });
   })
   .then(({ url }) => {
      console.log(`🚀 Apollo server running at : ${url}`);
      // extractMiddleImage();
   })