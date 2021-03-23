import cron from "cron";
import axios from "axios";
import express from "express";
import format from "pg-format";

const router = express.Router();
let view_list = {};

router.get("/", async (req, res) => {

  const username = req.query.username;
  let custom_label = req.query.label;
  let custom_style = req.query.style;
  let custom_color = req.query.color;
  const transparent = req.query.transparent.toLowerCase() == "true";

  if (!username) {
    return res.status(400).json({
      success: false,
      message: "Bad Request - No GitHub username was provided."
    }).end();
  }

  let count = await get_view_count(username)

  if (!custom_label) {
    custom_label = "profile%20view%20count"
  } else if (custom_label.includes("-") || custom_label.includes("/")) {
    custom_label = "profile%20view%20count"
  }
  if (!custom_style) {
    custom_style = "for-the-badge"
  }
  if (!custom_color) {
    custom_color = "blue"
  }

  let shield;
  if (!transparent) {
    console.log("ye")
    shield = await axios.get(`https://img.shields.io/badge/${custom_label}-${count}-${custom_color}?logo=github&style=${custom_style}`)
    res.set("Content-Type", "image/svg+xml")
    res.set("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0")
    res.status(200).send(
      shield.data
    ).end();
  } else {
    shield = "./assets/transparent.png"
    res.status(200).attachment(
      shield
    ).end();
  }

  
  try {
    const user_agent = req.headers["user-agent"] ? req.headers["user-agent"] : req.headers["User-Agent"]
    if (process.env.NODE_ENV != "development " && !user_agent.startsWith("github-camo")) {
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
  );

  let count = parseInt(response.rows[0].count);

  if (view_list[username]) {
    count += view_list[username].length;
  };

  return count;

};

async function increment_view_count(username) {

  const timestamp = new Date();

  if (view_list[username]) {
    view_list[username].push([username.toLowerCase(), timestamp]);
  } else if (!view_list[username]) {
    view_list[username] = [[username.toLowerCase(), timestamp]];
  };

}

const update_database = new cron.CronJob("*/1 * * * *", async () => {

  try {
    if (!Object.keys(view_list).length) return;

    debug("Updating database...");

    let updater = [];
    await Object.keys(view_list).forEach((item, index) => {
      updater = updater.concat(view_list[item].slice(0, 25))
    })

    await client.query(
      format(
        "INSERT INTO profile_views (username, timestamp) VALUES %L",
        updater
      )
    )

    view_list = [];

    debug("Updated database...\n\n")
  }
  catch(e) {
    debug(e);
  };

})
update_database.start();

export default router;
