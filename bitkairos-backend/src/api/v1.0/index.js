import Router from 'koa-router';
import auth from './auth';
import wallet from './wallet';
import exchange from './exchange';
import user from './user';
import order from './orders';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/wallet', wallet.routes());
api.use('/exchange', exchange.routes());
api.use('/user', user.routes());
api.use('/orders', order.routes());
export default api;
