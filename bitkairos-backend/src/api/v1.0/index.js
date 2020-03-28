import Router from 'koa-router';
import auth from './auth';
import wallet from './wallet';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/wallet', wallet.routes());
export default api;
