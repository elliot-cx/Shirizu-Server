import 'dotenv/config';
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import chalk from 'chalk';
import typeDefs from './graphql/typedefs';
import resolvers from './graphql/resolvers';
import { AnimesamaProvider } from './providers/videos/animesama';
import { NautiljonProvider } from './providers/data/nautiljon';

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
      // AnimesamaProvider.checkForUpdates();
      // AnimesamaProvider.getEpisodes('/videos/One%20Punch%20Man/').then((episodes) => {
      //    console.log(episodes);
         
      // })
      // AnimesamaProvider.getEpisodes('/videos/Vinland%20Saga/').then((episodes) => {
      //    console.log(episodes);
         
      // })
      // NautiljonProvider.search('spy x family').then((res) => {
      //    console.log(res);
      // })
      // NautiljonProvider.Retreive('https://www.nautiljon.com/animes/kage+no+jitsuryokusha+ni+naritakute!+2nd+season.html').then((res)=>{
      //    console.log(res);
      // });
   })