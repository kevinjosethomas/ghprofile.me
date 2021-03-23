import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {

  let name = req.query.name || req.query.username;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Bad Request - No GitHub name was provided."
    }).end();
  }

  name = name.toLowerCase();

  // Fetches views per day, over time
  const graph = await client.query(
    "select s1.reporting_date, case when s2.no_of_views is null then 0 else s2.no_of_views end as no_of_views from (SELECT generate_series(now() - interval '29' day, now(), '1 day')::date as reporting_date) as s1 left join (select date(timestamp) reporting_date_1, count(*) no_of_views from views where name = $1 group by date(timestamp)) as s2 on s1.reporting_date = s2.reporting_date_1",
    [name]
  )

  // Fetches views per period
  const period = await client.query(
    "select coalesce(sum(is_user), 0) as _all_time, coalesce(sum(in_30days), 0) as _month, coalesce(sum(in_14days), 0) as _fortnight, coalesce(sum(in_7days), 0) as _week, coalesce(sum(in_day), 0) as _day, coalesce(sum(in_hour), 0) as _hour from (select 1 as is_user,case when timestamp > (now() - interval '30' day) then 1 else 0 end as in_30days,case when timestamp > (now() - interval '14' day) then 1 else 0 end as in_14days, case when timestamp > (now() - interval '7' day) then 1 else 0 end as in_7days, case when timestamp > (now() - interval '1' day) then 1 else 0 end as in_day, case when timestamp > (now() - interval '1' hour) then 1 else 0 end as in_hour from views where name = $1) as sq1",
    [name]
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
