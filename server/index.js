const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const mongoose = require("mongoose");
const { PubSub } = require("graphql-subscriptions");

const express = require("express");
const { createServer } = require("http");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");
const cors = require("cors");

const MONGODB =
  "mongodb+srv://dbAdmin:dbAdmin@freeclustertest.f9g2th6.mongodb.net/?retryWrites=true&w=majority";

(async function () {
  const app = express();

  app.use(
    cors({
      origin: "*",
    })
  );

  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    { server: httpServer, path: "/graphql" }
  );

  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  mongoose.connect(MONGODB, { useNewUrlParser: true });

  const PORT = 4000;
  httpServer.listen(PORT, () =>
    console.log(" Http Server is now running on " + PORT)
  );
})();

// --------------------------------------------------------- PRE SUBSCRIPTION SERVER
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// // needs to be in seperate file (config file)
// const MONGODB =
//   "mongodb+srv://dbAdmin:dbAdmin@freeclustertest.f9g2th6.mongodb.net/?retryWrites=true&w=majority";

// // KEEP COMMENTED
// // server.listen().then(() => {
// //   console.log(`
// //   🚀  Server is running!
// //    🔉  Listening on port 4000
// //    📭  Query at http://localhost:4000
// //  `);
// // });

// mongoose
//   .connect(MONGODB, { useNewUrlParser: true })
//   .then(() => {
//     console.log("MongoDB Connected");
//     return server.listen({ port: process.env.PORT || 4000 });
//   })
//   .then((res) => {
//     console.log(`Server running at ${res.url}`);
//   });
