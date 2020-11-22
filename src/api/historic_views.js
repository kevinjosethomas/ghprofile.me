import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {

  const username = req.query.username;

  if (!username) {
    return res.status(400).json({
      success: false,
      message: "Bad Request - No GitHub username was provided."
    }).end();
    return
  }

  if (username.length > 39) {
    return res.status(400).json({
      success: false,
      message: "Bad Request - Invalid GitHub username was provided."
    }).end();
  }

  let response = await client.query(
    "select s1.reporting_date, case when s2.no_of_views is null then 0 else s2.no_of_views end as no_of_views from (SELECT generate_series(now() - interval '29' day, now(), '1 day')::date as reporting_date) as s1 left join (select date(timestamp) reporting_date_1, count(*) no_of_views from profile_views where username = $1 group by date(timestamp)) as s2 on s1.reporting_date = s2.reporting_date_1",
    [username.toLowerCase()]
  )

  return res.status(200).json({
    success: true,
    payload: response.rows
  }).end();

})

export default router;
