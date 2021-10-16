import { CronJob } from 'cron';
import SQL from 'sql-template-strings';
import { getPool } from '../pool.js';
import { getViews } from '../common/get-views.js';

/** Every hour in crontab format */
const everyHour = '*/60 * * * *';

export const updateViewCount = new CronJob(everyHour, async () => {
  try {
    const keys = Object.keys(views);
    if (!keys.length) return;

    logger.debug('Updating database.');

    const newViews = getViews(keys);
    if (!newViews.length) return;

    const pool = await getPool();
    await pool.query(SQL`
      INSERT INTO views (name, timestamp) VALUES ${newViews}
    `);

    logger.debug('Updated database.');
  } catch(error) {
    logger.error(error);
  };
});
