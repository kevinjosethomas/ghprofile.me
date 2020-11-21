import express from "express";

const router = express.Router();


async function get_view_count(username) {

  let response = await client.query(
    "SELECT  * FROM profile_views WHERE username = $1",
    [username]
  )

  return response;

};

async function increment_view_count(username) {

  const timestamp = Math.floor(Date.now() / 1000)

  await client.query(
    "INSERT INTO profile_views (username, timestamp) VALUES ($1, $2)",
    [username.slice(0, 40), timestamp]
  )

}

router.get("/", async (req, res) => {

});

export default router;
