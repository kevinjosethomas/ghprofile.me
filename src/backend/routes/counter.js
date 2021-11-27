import axios from "axios";

export default async function router(fastify) {
  fastify.get("/", async (req, res) => {
    const name = req.query.username;

    if (!name) {
      return res.code(400).send({ success: false, message: "Bad Request - No username provided" });
    }

    const label = req.query.label || "Profile%20View%20Count";
    const style = req.query.style || "for-the-badge";
    const color = req.query.color || "blue";

    const agent = (req.headers["user-agent"] || req.headers["User-Agent"])
      .toLowerCase()
      .startsWith("github-camo");
    const transparent = req.query.transparent
      ? req.query.transparent.toLowerCase() === "true"
      : false;

    if (!transparent) {
      const shield = await axios.get(
        `https://img.shields.io/badge/${label}-0-${color}?logo=github&style=${style}`
      );

      res.header("Content-Type", "image/svg+xml");
      res.header("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0");

      res.code(200).send(shield.data)();
    }
  });
}
