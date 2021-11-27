import dotenv from "dotenv";
import fastify from "fastify";

import database from "./plugins/database.js";
import middleware from "./plugins/middleware.js";

dotenv.config();

const app = fastify({ logger: true });

app.register(database);
app.register(middleware);

const run = async () => {
  await app.listen(process.env.PORT);
};

run().catch((error) => {
  console.error(`Failed to run webserver - {error.message}`);
});
