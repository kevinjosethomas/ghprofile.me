import SQL from 'sql-template-strings';
import { views } from '../store.js';
import { getPool } from '../pool.js'

export const getViewCount = async (name) => {
  const user = views[name];
  if (user) {
    return user.totalViewCount;
  }

  const pool = await getPool();
  const query = SQL`SELECT COUNT(*) FROM views WHERE name = ${name}`;
  const count = await pool.query(query);
  return count.rowCount ? count.rows[0].count : 0;
};