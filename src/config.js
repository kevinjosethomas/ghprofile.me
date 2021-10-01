import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load .env into process.env
dotenv.config();

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const debug = async (msg) => {
  process.env.DEBUG && console.log(msg);
};
