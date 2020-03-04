import Router from 'koa-router';

const auth = new Router();

auth.get('/', (ctx) => {
  ctx.body = 'hi';
});

export default auth;
