import axios from "axios";
import config from "config";
import express from "express";
import typeDefs from "./schema/typedefs";
import resolvers from "./schema/resolvers";
import Postgres from "./connectors/postgres";
import FetcherAPI from "./connectors/fetcherAPI";
import Restaurant from "./datasources/restaurant";
import { createClient } from "redis";
import { ApolloServer } from "apollo-server-express";
import { Pool } from "pg";
import Redis from "./connectors/redis";

const main = async () => {
  const app = express();
  const redisClient = createClient({ url: config.get("redis.url") });
  await redisClient.connect();

  const dataSources = () => ({
    restaurants: new Restaurant(
      new Postgres(new Pool(config.get("database"))),
      new FetcherAPI(axios, config.get("api.url")),
      new Redis(redisClient)
    ),
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
  });

  await server.start();
  server.applyMiddleware({ app });
  app.listen({ port: config.get("server.port") }, () =>
    console.info(
      `🚀 Server ready and listening at ==> http://localhost:${config.get(
        "server.port"
      )}${server.graphqlPath}`
    )
  );
};

main().catch((error) => {
  console.error("Server failed to start", error);
});
