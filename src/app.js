// Modules
import cors from "cors";
import path from "path";
import Pool from "pg-pool";
import dotenv from "dotenv";
import helmet from "helmet";
import express from "express";
import { fileURLToPath } from "url";
import body_parser from "body-parser";
import compression from "compression";

// Routes
import view_route from "./api/view.js";
import historic_views_route from "./api/historic_views.js";


// Initalization
dotenv.config();
const app = express();


// Configuration
global.__dirname = path.dirname(fileURLToPath(import.meta.url));
global.debug = async (msg) => {
  process.env.DEBUG && console.log(msg);
}

const pool = new Pool({
  database: process.env.DATABASE,
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  idleTimeoutMillis: 1000,
  connectionTimeoutMillis: 1000
});


// Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(body_parser.json());


// Routes
app.use("/view", view_route);
app.use("/historic/view", historic_views_route);


// Execution
(async () => {

  global.client = await pool.connect();

  app.listen(process.env.PORT || 1120, () => {
    console.log(`Server Started on ${process.env.PORT || "1120"}`);
  })

})()
