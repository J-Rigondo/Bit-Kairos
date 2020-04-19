import Router from 'koa-router';
import * as exchangeCtrl from './exchange.ctrl';

const exchange = new Router();

exchange.get('/', exchangeCtrl.getInitialExchangeRate);

export default exchange;
