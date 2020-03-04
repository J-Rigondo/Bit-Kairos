import Koa from 'koa';
import dotenv from 'dotenv';
import Router from 'koa-router';
import api from './api';
import './db/db.js';
import './db/model/Rate';

import './crawler/socket';
import * as test from './crawler';

dotenv.config();
const { PORT } = process.env;

test.registerInitialExchangeRate();

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());
app.use(router.routes());
app.use(router.allowedMethods());

app.use((ctx) => {
  console.log('hello kaiors');
  ctx.body = 'hihi';
});

app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});
