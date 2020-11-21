import axios from "axios"
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
  console.log("\n\n\n\n\n\n")
  axios.get("https://img.shields.io/badge/coverage-100%25-brightgreen")
  .then(data => {
    res.set("Content-Type", "image/svg+xml")
    res.set("Cache-Control", ["no-cache", "no-store", "must-revalidate", "max-age=0"])
    res.send(data.data)
  })
  .catch(e => {
    console.log(e)
  })

})


// Execution
app.listen(process.env.PORT || 2011, () => {
  console.log(`Server Started on ${process.env.PORT || "2011"}`)
})
