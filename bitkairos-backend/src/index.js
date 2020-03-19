import Koa from 'koa';
import dotenv from 'dotenv';
import Router from 'koa-router';
import api from './api';
import bodyParser from 'koa-bodyparser';
import * as jwtMiddleware from 'lib/middlewares/jwt';
import './db/db.js';
import './db/model/Rate';
import './db/model/User';
//import './crawler/socket';

dotenv.config();
const { PORT } = process.env;

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());
app.use(jwtMiddleware.tokenCheck);
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.use((ctx) => {
  console.log('hello kairos');
  ctx.body = 'hihi';
});

app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});
