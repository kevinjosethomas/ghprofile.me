import dotenv from "dotenv";
import fastify from "fastify";

import store from "./plugins/store.js";
import database from "./plugins/database.js";
import middleware from "./plugins/middleware.js";

import counter from "./routes/counter.js";

dotenv.config();

const app = fastify({ logger: true });

app.register(store);
app.register(database);
app.register(middleware);

app.register(counter);

const run = async () => {
  await app.listen(process.env.PORT);
};

run().catch((error) => {
  console.error(`Failed to run webserver - {error.message}`);
});
