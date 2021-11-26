import dotenv from "dotenv";
import fastify from "fastify";

dotenv.config();

const app = fastify({ logger: true });

(async () => {
  await app.listen(process.env.PORT);
})();
