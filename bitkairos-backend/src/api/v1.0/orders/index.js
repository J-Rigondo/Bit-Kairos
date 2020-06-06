import Router from 'koa-router';
import * as ordersCtrl from './orders.ctrl';

const orders = new Router();

orders.get('/', ordersCtrl.getOrders);
orders.post('/', ordersCtrl.createOrders);

export default orders;
