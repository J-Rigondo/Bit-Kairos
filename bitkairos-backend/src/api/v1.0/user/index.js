import Router from 'koa-router';
import * as userCtrl from './user.ctrl';

const user = new Router();

user.get('/me/metainfo', userCtrl.getMetaInfo);
user.patch('/me/metainfo', userCtrl.patchMetaInfo);

export default user;
