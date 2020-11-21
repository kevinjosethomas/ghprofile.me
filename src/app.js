import path from "path";
import dotenv from "dotenv";
import helmet from "helmet";
import express from "express";
import { fileURLToPath } from "url";
import body_parser from "body-parser";
import compression from "compression";


// Initalization
dotenv.config();
const app = express();


// Configuration
global.__dirname = path.dirname(fileURLToPath(import.meta.url));
global.debug = (msg) => {
  process.env.DEBUG && console.log(msg);
}


// Middleware
app.use(helmet());
app.use(compression());
app.use(body_parser.json());


app.get("/", (req, res) => {

  console.log(req)

})


// Execution
app.listen(process.env.PORT || 2011, () => {
  console.log(`Server Started on ${process.env.PORT || "2011"}`)
})
