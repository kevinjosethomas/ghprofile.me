import axios from "axios";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {

  const username = req.query.username;

  console.log(req.headers)
  console.log("\n\n")

  if (!username) {
    res.status(400).json({
      success: false,
      message: "Bad Request - Invalid GitHub username was provided."
    }).end();
    return
  }

  if (username.length > 39) {
    res.status(400).json({
      success: false,
      message: "Bad Request - Invalid GitHub username was provided."
    }).end();
    return
  }

  let count = await get_view_count(username)

  let shield = await axios.get(
    `https://img.shields.io/badge/Profile%20view%20count-${count}-blue?logo=github&style=for-the-badge`
  )

  res.set("Content-Type", "image/svg+xml")
  res.set("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0")
  res.status(200).send(
    shield.data
  ).end();

  try {
    if (!req.headers["user-agent"].startsWith("github-camo") && !req.headers["User-Agent"].startsWith("github-camo")) {
      return;
    }
  }
  catch(e) {
    return;
  }

  await increment_view_count(username)

});

async function get_view_count(username) {

  let response = await client.query(
    "SELECT COUNT(*) FROM profile_views WHERE username = $1",
    [username.toLowerCase()]
  )

  return response.rows[0].count;

};

async function increment_view_count(username) {

  const timestamp = Math.floor(Date.now() / 1000)

  await client.query(
    "INSERT INTO profile_views (username, timestamp) VALUES ($1, $2)",
    [username.toLowerCase().slice(0, 40), timestamp]
  )

}

export default router;
