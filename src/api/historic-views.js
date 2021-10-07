import SQL from 'sql-template-strings';
import express from "express";
import { getPool } from '../pool';

const router = express.Router();

const fetchViewsPerDay = (name) => {
  const pool = await getPool();
  const query = SQL`
    SELECT s1.reporting_date,
      CASE
        WHEN s2.no_of_views IS NULL THEN 0
        ELSE s2.no_of_views
      end AS no_of_views
    FROM (SELECT Generate_series(Now() - INTERVAL '29' day, Now(), '1 day') :: date AS reporting_date) AS s1
    LEFT JOIN (SELECT Date(timestamp) reporting_date_1, Count(*) no_of_views FROM views WHERE name = ${name} GROUP BY Date(timestamp)) AS s2
    ON s1.reporting_date = s2.reporting_date_1
  `;
  return pool.query(query);
};

// Fetches views per period
const fetchViewsPerPeriod = (name) => {
  const pool = await getPool();
  const query = SQL`
    SELECT
      Coalesce(SUM(is_user), 0)   AS _all_time,
      Coalesce(SUM(in_30days), 0) AS _month,
      Coalesce(SUM(in_14days), 0) AS _fortnight,
      Coalesce(SUM(in_7days), 0)  AS _week,
      Coalesce(SUM(in_day), 0)    AS _day,
      Coalesce(SUM(in_hour), 0)   AS _hour
    FROM (SELECT 1 AS is_user,
      CASE
        WHEN timestamp > ( Now() - interval '30' day ) THEN 1
        ELSE 0
      END AS in_30days,
      CASE
        WHEN timestamp > ( Now() - interval '14' day ) THEN 1
        ELSE 0
      END AS in_14days,
      CASE
        WHEN timestamp > ( Now() - interval '7' day ) THEN 1
        ELSE 0
      END AS in_7days,
      CASE
        WHEN timestamp > ( Now() - interval '1' day ) THEN 1
        ELSE 0
      END AS in_day,
      CASE
        WHEN timestamp > ( Now() - interval '1' hour ) THEN 1
        ELSE 0
      END AS in_hour
    FROM   VIEWS
    WHERE name = ${name}) AS sq1
  `;
  return pool.query(query);
}

router.get('/', async (req, res) => {
  const name = req.opts.name;

  // Fetch views per day, over time
  const graph = await fetchViewsPerDay(name);

  // Fetch views per period
  const period = await fetchViewsPerPeriod(name);

  return res.status(200).json({
    success: true,
    payload: {
      graph: graph.rows,
      period: period.rows[0]
    }
  }).end();
});

export default router;
