import { ApolloServer } from "apollo-server-express";
import {Pool} from "pg";
import typeDefs from "./schema/typedefs";
import Postgres  from "./middlewares/postgres";
import express from "express";
import config from "config";
import Restaurant from "./datasources/restaurant";
import resolvers from "./schema/resolvers"

const main = async () => {
  const app = express();
  let pool = new Pool({ connectionString: 'postgres://postgres:postgres@postgres:5432/thefork' });
  const database = new Postgres(pool);
  const dataSources = () => ({
    postgres: new Restaurant({database})
  })
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources
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
