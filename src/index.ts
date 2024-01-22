import 'dotenv/config';
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import { fileURLToPath } from 'url';
import { LogType, log } from '../utils/logger';
import { AnimesamaProvider } from './providers/videos/animesama';
import { NautiljonProvider } from './providers/data/nautiljon';
import mongoose from "mongoose";
import typeDefs from './graphql/typedefs';
import resolvers from './graphql/resolvers';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
   typeDefs: typeDefs,
   resolvers: resolvers,
   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
   formatError: (error) => {
      const { extensions: { code, ...restExtensions }, message } = error;
      return {
         message,
         extensions: { code },
      };
   }
});

log("Starting Apollo Server...");
await server.start();
log("Connecting to MongoDB...");
await mongoose.connect(process.env.MONGODB);
log("MongoDB connection successful", LogType.SUCCESS);

app.use(express.static(path.join(__dirname, '../public')));

app.use(cors(), bodyParser.json(), expressMiddleware(server));

log("Launching express server...");
httpServer.listen({ port: parseInt(process.env.PORT) }, () => {
   console.log(`🚀 Apollo server running at : http://localhost:${process.env.PORT}`);

   // extractMiddleImage();
   // AnimesamaProvider.checkForUpdates();
   // AnimesamaProvider.getEpisodes('/videos/One%20Punch%20Man/').then((episodes) => {
   //    console.log(episodes);
   // })
   // NautiljonProvider.Retreive('https://www.nautiljon.com/animes/mashle.html').then((res) => {
   //    console.log(res);
   // });
});