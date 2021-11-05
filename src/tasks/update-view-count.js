import { CronJob } from 'cron';
import format from "pg-format";
import SQL from 'sql-template-strings';
import { getPool } from '../pool.js';
import { views } from '../store.js';
import { getViews } from '../common/get-views.js';

/** Every hour in crontab format */
// */60 * * * *
const everyHour = '*/5 * * * *';

export const updateViewCount = new CronJob(everyHour, async () => {
  try {
    const keys = Object.keys(views);
    if (!keys.length) return;

    console.debug('Updating database.');

    const newViews = getViews(keys);
    if (!newViews.length) return;

    const pool = await getPool();
    await pool.query(format('INSERT INTO views (name, timestamp) VALUES %L', newViews));

    console.debug('Updated database.');
  } catch(error) {
    console.error(error);
  };
});
