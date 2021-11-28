import { ApolloServer } from "apollo-server-express";
import express from "express";
import config from "config";
import typeDefs from "./schema/typedefs";
import resolvers from "./schema/resolvers";
import Postgres from "./connectors/postgres";
import FetcherAPI from "./connectors/fetcherAPI";
import Restaurant from "./datasources/restaurant";

const main = async () => {
  const app = express();
  const dataSources = () => ({
    postgres: new Restaurant(
      new Postgres(config.get("database")),
      new FetcherAPI()
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
