import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import compression from 'compression';
import viewRoute from './api/view.js';
import historicViewsRoute from './api/historic-views.js';
import { requireQueryParam } from './middleware/require-query-param.js';

const port = parseInt(process.env.PORT || '0', 10);

export const app = async () => {  
  const server = express();

  const requireGithubNameMiddleware = requireQueryParam(['name', 'username'], 'Bad Request - No GitHub name was provided.');
  
  server.use(cors());
  server.use(helmet());
  server.use(compression());
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use('/view', requireGithubNameMiddleware, viewRoute);
  server.use('/historic/view', requireGithubNameMiddleware, historicViewsRoute);

  const listener = server.listen(port, () => {
    console.log('Server started on %s', listener.address().port);
  });
};
