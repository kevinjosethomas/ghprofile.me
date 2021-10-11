import SQL from 'sql-template-strings';
import { views } from '../store.js';
import { getPool } from '../pool.js'

export const fetchUser = async (name) => {
    const pool = await getPool();
    const query = SQL`SELECT COUNT(*) FROM views WHERE name = ${name}`;
    const count = await pool.query(query);
    const totalViewCount = count.rowCount ? count.rows[0].count : 0;

    // Update cache
    views[name] = {
      cachedViews: [],
      totalViewCount
    };

    return views[name];
}