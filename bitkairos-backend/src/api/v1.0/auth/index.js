import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

const auth = new Router();

auth.get('/email-check/:email', authCtrl.checkEmail);
auth.get('/displayName-check/:displayName', authCtrl.checkDisplayName);
auth.post('/register/local', authCtrl.localRegister);
auth.post('/login/local', authCtrl.localLogin);
auth.get('/check', authCtrl.check);

export default auth;
