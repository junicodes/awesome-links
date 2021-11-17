import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../graphql/schema";
import { resolvers } from "../../graphql/resolvers";
import { createContext } from "../../graphql/context";
//Micro cors to enables us use appollo server studio without issues
import Cors from "micro-cors";

const cors = Cors();

const apolloServer = new ApolloServer({
  schema,
  resolvers,
  context: createContext,
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
});

//disabled bodypaser
export const config = {
  api: {
    bodyParser: false,
  },
};
