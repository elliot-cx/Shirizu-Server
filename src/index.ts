import 'dotenv/config';
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import chalk from 'chalk';
import userTypeDefs from './graphql/typedefs/userTypeDefs';
import userResolvers from './graphql/resolvers/userResolvers';

const server = new ApolloServer({
    typeDefs: [userTypeDefs],
    resolvers: [userResolvers],
    formatError: (error) => {
        const { extensions: { code, ...restExtensions }, message } = error;
        return {
          message,
          extensions: {
            code,
          },
        };
      },
});

mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log(chalk.green("[✓]"), "MongoDB connection successful");
        return startStandaloneServer(server, {
            listen: { port: parseInt(process.env.APOLLO_PORT) }
        });
    })
    .then(({url}) => {
        console.log(`🚀 Apollo server running at : ${url}`);
    })