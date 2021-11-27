export default async function router(fastify) {
  fastify.get("/leaderboard", async (req, res) => {
    const leaderboard = await fastify.pg.query(
      "SELECT name, SUM(count) FROM readme_views GROUP BY name ORDER BY SUM(count) DESC LIMIT 10"
    );

    res.code(200).send({
      success: true,
      payload: leaderboard.rows,
    });
  });
}
