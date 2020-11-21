import express from "express";

const router = express.Router();


async function get_view_count(username) {

  let response = await client.query(
    "SELECT COUNT(*) FROM profile_views WHERE username = $1",
    [username.toLowerCase()]
  )

  return response.data.count;

};

async function increment_view_count(username) {

  const timestamp = Math.floor(Date.now() / 1000)

  await client.query(
    "INSERT INTO profile_views (username, timestamp) VALUES ($1, $2)",
    [username.toLowerCase().slice(0, 40), timestamp]
  )

}

router.get("/", async (req, res) => {

  const username = req.query.username;
  if (username.length > 39) {
    res.status(400).json({
      success: false,
      message: "Bad Request - Invalid GitHub username was provided."
    }).end();
    return
  }

  let count = await get_view_count(username)
  console.log(count);
  res.send(count)

  await increment_view_count(username)


});

export default router;
