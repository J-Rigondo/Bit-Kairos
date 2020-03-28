import Router from 'koa-router';
import * as walletCtrl from './wallet.ctrl';

const wallet = new Router();

wallet.get('/', walletCtrl.get);

export default wallet;
