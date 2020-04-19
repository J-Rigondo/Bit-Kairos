import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

const auth = new Router();

auth.get('/email-check/:email', authCtrl.checkEmail);
auth.get('/displayName-check/:displayName', authCtrl.checkDisplayName);
auth.post('/register/local', authCtrl.localRegister);
auth.post('/login/local', authCtrl.localLogin);
auth.post('/login/:provider(facebook|google)', authCtrl.socialLogin);
auth.post('/register/:provider(facebook|google)', authCtrl.socialRegister);
auth.get('/check', authCtrl.check);
auth.get('/logout', authCtrl.logout);

export default auth;
