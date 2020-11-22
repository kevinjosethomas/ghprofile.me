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

  // Fetches views per day, over time
  let graph = await client.query(
    "select s1.reporting_date, case when s2.no_of_views is null then 0 else s2.no_of_views end as no_of_views from (SELECT generate_series(now() - interval '29' day, now(), '1 day')::date as reporting_date) as s1 left join (select date(timestamp) reporting_date_1, count(*) no_of_views from profile_views where username = $1 group by date(timestamp)) as s2 on s1.reporting_date = s2.reporting_date_1",
    [username.toLowerCase()]
  )

  // Fetches views per period
  let period = await client.query(
    "select sum(is_user) as _all_time, sum(in_30days) as _month, sum(in_14days) as _fortnight, sum(in_7days) as _week, sum(in_day) as _day, sum(in_hour) as _hour from (select 1 as is_user,case when timestamp > (now() - interval '30' day) then 1 else 0 end as in_30days,case when timestamp > (now() - interval '14' day) then 1 else 0 end as in_14days, case when timestamp > (now() - interval '7' day) then 1 else 0 end as in_7days, case when timestamp > (now() - interval '1' day) then 1 else 0 end as in_day, case when timestamp > (now() - interval '1' hour) then 1 else 0 end as in_hour from profile_views where username = $1) as sq1",
    [username.toLowerCase()]
  )

  return res.status(200).json({
    success: true,
    payload: {
      graph: graph.rows,
      period: period.rows[0]
    }
  }).end();

})

export default router;
