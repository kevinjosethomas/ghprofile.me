import moment from "moment";

export default async function router(fastify) {
  fastify.get("/chart", async (req, res) => {
    const name = req.query.username;

    if (!name) {
      return res.code(400).send({ success: false, message: "Bad Request - No username provided" });
    }

    const chart = await fastify.pg.query(
      "SELECT * FROM readme_views WHERE LOWER(name) = $1 ORDER BY hour ASC LIMIT 720",
      [name]
    );

    const days = [];
    const hours = [];

    const date = moment().set({ minute: 0, second: 0, millisecond: 0 });

    for (let day = 29; day >= 0; day--) {
      let daily = 0;

      for (let hour = 23; hour >= 0; hour--) {
        const newDate = date.clone().subtract(day, "days").subtract(hour, "hours").toDate();
        const period = chart.rows.filter(
          (row) =>
            row.hour.getHours() === newDate.getHours() &&
            row.hour.getDate() === newDate.getDate() &&
            row.hour.getMonth() === newDate.getMonth()
        );

        const hourly = period.reduce((a, b) => a + b.count, 0) || 0;

        daily += hourly;
        hours.push({ t: newDate, v: hourly });
      }

      const newDate = date.clone().subtract(day, "days").toDate();
      days.push({ t: newDate, v: daily });

      daily = 0;
    }

    res.code(200).send({
      success: true,
      payload: {
        days: days,
        hours: hours,
      },
    });
  });
}
