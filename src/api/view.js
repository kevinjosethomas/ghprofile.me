import cron from "cron";
import express from "express";
import format from "pg-format";

const router = express.Router();
const views = {};

router.get("/", async (req, res) => {

  let name = req.query.name || req.query.username;
  let customLabel = req.query.label || "profile%20view%20count";
  let customStyle = req.query.style || "for-the-badge";
  let customColor = req.query.color || "blue";
  let transparent = req.query.transparent ? req.query.transparent.toLowerCase() == "true" : false;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Bad Request - No GitHub name was provided."
    }).end();
  }

  name = name.toLowerCase();

  const count = await getViewCount(name)

  let shield;
  if (!transparent) {
    await res.status(200).redirect(
      `https://img.shields.io/badge/${customLabel}-${count}-${customColor}?logo=github&style=${customStyle}`
    );
  } else {
    shield = "./assets/transparent.png"
    await res.status(200).attachment(shield).end();
  }

  try {
    const user_agent = req.headers["user-agent"] ? req.headers["user-agent"] : req.headers["User-Agent"];
    if (process.env.NODE_ENV != "development " && !user_agent.startsWith("github-camo")) {
      return;
    }
  }
  catch(e) {
    return;
  }

  await incrementViewCount(name)

});

async function getViewCount(username) {

  let totalViewCount;
  const user = views[username];
  if (user) {
    totalViewCount = user.totalViewCount;
  } else {
     const count = await client.query(
      "SELECT COUNT(*) FROM views WHERE name = $1",
      [username]
    );
    if (count.rowCount) {
      totalViewCount = count.rows[0].count;
      views[username] = {
        totalViewCount: 0,
        cachedViews: []
      }
    } else {
      totalViewCount = 0;
      views[username] = {
        totalViewCount: 0,
        cachedViews: []
      }
    }
  }

  return totalViewCount;

};

async function incrementViewCount(username) {

  const timestamp = new Date();
  views[username].cachedViews.push([username, timestamp]);
  views[username].totalViewCount++;

}

const updateViewCount = new cron.CronJob("*/1 * * * *", async () => {

  try {
    if (!Object.keys(views).length) return;

    debug("Updating database...\n");

    let updater = [];
    await Object.keys(views).forEach(item => {
      updater = updater.concat(views[item].cachedViews.slice(0, 1500));
      views[item].cachedViews = [];
    });

    await client.query(
      format(
        "INSERT INTO views (name, timestamp) VALUES %L",
        updater
      )
    )

    debug("Updated database...\n\n")
  }
  catch(e) {
    debug(e);
  };

})
updateViewCount.start();

export default router;
