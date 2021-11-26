import plugin from "fastify-plugin";

import postgres from "fastify-postgres";

async function database(fastify) {
  fastify.register(postgres, {
    connectionString: process.env.DATABASE_URL,
  });
}

export default plugin(database);
