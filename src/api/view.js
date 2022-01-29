import axios from "axios";
import express from "express";
import { getViewCount } from '../common/get-view-count.js';
import { incrementCachedViewCount } from '../common/increment-cached-view-count.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const name = req.opts.name;
  const customLabel = req.query.label || 'profile%20view%20count';
  const customStyle = req.query.style || 'for-the-badge';
  const customColor = req.query.color || 'blue';
  const transparent = req.query.transparent ? req.query.transparent.toLowerCase() === 'true' : false;
  const count = await getViewCount(name);

  if (!transparent) {
    const shield = await axios.get(`https://img.shields.io/badge/${customLabel}-${count}-${customColor}?logo=github&style=${customStyle}`)
    res.set("Content-Type", "image/svg+xml");
    res.set("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0")
    res.status(200).send(shield.data).end();
  } else {
    const shield = "./assets/transparent.png"
    res.status(200).attachment(shield).end();
  }

  const userAgent = req.headers['user-agent'] ? req.headers['user-agent'] : req.headers['User-Agent'];
  const isDev = process.env.NODE_ENV === 'development';
  const isGithubCamo = userAgent?.startsWith('github-camo');
  if (!isDev && !isGithubCamo) return;

  incrementCachedViewCount(name);
});

export default router;
