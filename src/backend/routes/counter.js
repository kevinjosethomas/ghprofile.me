import axios from "axios";

export default async function router(fastify) {
  fastify.get("/", async (req, res) => {
    const name = req.query.username;

    if (!name) {
      return res.code(400).send({ success: false, message: "Bad Request - No username provided" });
    }

    const count = await getCachedViewCount(fastify, name);

    const label = req.query.label || "Profile%20View%20Count";
    const style = req.query.style || "for-the-badge";
    const color = req.query.color || "blue";

    const github = (req.headers["user-agent"] || req.headers["User-Agent"])
      .toLowerCase()
      .startsWith("github-camo");
    const transparent = req.query.transparent
      ? req.query.transparent.toLowerCase() === "true"
      : false;

    if (!transparent) {
      const shield = await axios.get(
        `https://img.shields.io/badge/${label}-${count}-${color}?logo=github&style=${style}`
      );

      res.header("Content-Type", "image/svg+xml");
      res.header("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0");

      res.code(200).send(shield.data);
    }

    if (!github) {
      incrementCachedViewCount(fastify, name);
    }
  });
}

const getCachedViewCount = async (fastify, name) => {
  if (fastify.views[name]) {
    return fastify.views[name].stored + fastify.views[name].new;
  } else {
    const query = await fastify.pg.query(
      "SELECT SUM(count) AS count FROM readme_views WHERE LOWER(name) = $1",
      [name.toLowerCase()]
    );
    const count = query.rows[0].count || 0;

    fastify.views[name] = {
      new: 0,
      stored: count,
    };

    return count;
  }
};

const incrementCachedViewCount = async (fastify, name) => {
  const exists = fastify.views[name];

  if (!exists) {
    return;
  } else {
    fastify.views[name].new += 1;
  }
};
