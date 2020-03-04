import Router from 'koa-router';
import temp from './v1.0';

const versions = {
  '1.0': temp
};

const api = new Router();

api.use('/v1.0', versions['1.0'].routes());

export default api;
