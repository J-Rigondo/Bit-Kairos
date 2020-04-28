import Koa from 'koa';
import dotenv from 'dotenv';
import Router from 'koa-router';
import api from './api';
import bodyParser from 'koa-bodyparser';
import websockify from 'koa-websocket';
import ws from './ws';
import * as jwtMiddleware from 'lib/middlewares/jwt';
import './db/db.js';
import './db/model/Rate';
import './db/model/User';
import './crawler';

dotenv.config();
const { PORT } = process.env;

const app = websockify(new Koa());
const router = new Router();

app.use(jwtMiddleware.tokenCheck);
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
router.use('/api', api.routes());
app.ws.use(ws.routes()).use(ws.allowedMethods());

app.use((ctx) => {
  console.log('hello kairos');
  ctx.body = 'hihi kairos';
});

app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});
