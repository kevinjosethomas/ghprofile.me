import dotenv from "dotenv";
import fastify from "fastify";

import store from "./plugins/store.js";
import database from "./plugins/database.js";
import middleware from "./plugins/middleware.js";

import updateViewCount from "./tasks/update_view_count.js";

import counter from "./routes/counter.js";

dotenv.config();

const app = fastify();

app.register(store);
app.register(database);
app.register(middleware);

app.register(counter);

const run = async () => {
  await app.listen(process.env.PORT);
  console.log(`Server listening on Port ${process.env.PORT}`);

  updateViewCount(app);
};

run().catch((error) => {
  console.error(`Failed to run webserver - {error.message}`);
});
