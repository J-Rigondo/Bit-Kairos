import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

const auth = new Router();

auth.get('/', (ctx) => {
  ctx.body = 'hi';
});

auth.post('/register/local', authCtrl.localRegister);

export default auth;
