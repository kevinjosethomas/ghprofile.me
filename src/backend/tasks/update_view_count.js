import { CronJob } from "cron";
import format from "pg-format";

const interval = "* * * * *";

export default async function updateViewCount(fastify) {
  new CronJob(interval, async () => {
    try {
      console.debug("Updating view count");

      const keys = Object.keys(fastify.views);
      if (!keys.length) {
        return;
      }

      const formatted = [];

      for (const key of keys) {
        if (!fastify.views[key].new) {
          continue;
        }

        const date = new Date();
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        formatted.push([key.toLowerCase(), parseInt(fastify.views[key].new), date]);

        fastify.views[key].stored += fastify.views[key].new;
        fastify.views[key].new = 0;
      }

      await fastify.pg.query(
        format("INSERT INTO readme_views (name, count, hour) VALUES %L", formatted)
      );

      console.debug("Updated view count");
    } catch (e) {
      console.error(e);
    }
  }).start();
}
