import plugin from "fastify-plugin";

async function store(fastify) {
  fastify.decorate("views", {});
}

export default plugin(store);
