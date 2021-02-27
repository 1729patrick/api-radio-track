import 'dotenv/config';

import rateLimit from 'express-rate-limit';
import express from 'express';
import routes from './routes';
import { resolve } from 'path';

import cors from 'cors';

import './database';

import './config/paginate';

// import rateLimitConfig from './config/rateLimit';

// const limiter = rateLimit(rateLimitConfig);
// const imageLimiter = rateLimit({
//   ...rateLimitConfig,
//   max: rateLimitConfig.max * 12,
// });

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.set('trust proxy', 1);

    this.server.use(cors());
    this.server.use(express.json());

    this.server.use(
      '/files',
      // imageLimiter,
      express.static(resolve(__dirname, '..', 'tmp', 'images'))
    );

    this.server.use(
      '/flags',
      // imageLimiter,
      express.static(resolve(__dirname, '..', 'tmp', 'flags'))
    );

    // this.server.use(limiter);
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
