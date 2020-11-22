import 'dotenv/config';

import express from 'express';
import routes from './routes';
import { resolve } from 'path';

import cors from 'cors';

import './database';
import './config/paginate';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());

    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'images'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
