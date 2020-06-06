import Router from 'koa-router';
import shortId from 'shortid';
import redis from 'redis';
import lzutf8 from 'lzutf8';
import { tokenCheck } from 'lib/middlewares/jwt';
import EventEmitter from 'events';
import log from 'lib/log';
import * as util from './utils';

const emitter = new EventEmitter();
emitter.setMaxListeners(0); //infinite

const ORDER_PROCESSED = 'ORDER_PROCESSED';
const TICKER = 'TICKER';

const generalHandlers = {
  ORDER_PROCESSED: (payload) => {
    const { userId } = payload;
    const channel = `ORDER_PROCESSED:${userId}`;
    emitter.emit(channel, {
      type: 'ORDER_PROCESSED',
      payload
    });
  },

  TICKER: (payload) => {
    emitter.emit('TICKER', {
      type: 'TICKER',
      payload
    });
  }
};

const generalSubscriber = redis.createClient();
generalSubscriber.subscribe('general');
generalSubscriber.on('message', (channel, message) => {
  const data = util.parseJSON(message);
  if (!data) return;

  const { type, payload } = data;
  if (!generalHandlers[type]) return;
  generalHandlers[type](payload);
});

const msgTypes = {
  general: 1,
  subscribe: 2,
  unsubscribe: 3
};

const userChannels = ['ORDER_PROCESSED'];

function isUserChannel(channel) {
  return userChannels.indexOf(channel) !== -1;
}

const ws = new Router();

ws.get('/ws', tokenCheck, (ctx, next) => {
  ctx.websocket.id = shortId.generate();
  const { user } = ctx.request;
  const subscribed = [];
  log('ws Connected: ', ctx.websocket.id, user);
  const appendUserId = (channel) => `${channel}:${user._id}`;
  const processChannel = (channel) =>
    isUserChannel(channel) ? appendUserId(channel) : channel;

  const publish = async (message) => {
    const data = await util.compress(JSON.stringify(message));
    ctx.websocket.send(data);
  };

  const subscribe = (channel) => {
    console.log(`subscribing to ${channel}`);
    subscribed.push(channel);
    emitter.on(channel, publish);
  };

  const unsubscribe = (channel) => {
    console.log(`unsubscribed ${channel}`);
    emitter.removeListener(channel, publish);
  };

  const handlers = {
    [msgTypes.subscribe]: (channel) => {
      subscribe(processChannel(channel));
    },
    [msgTypes.unsubscribe]: (channel) => {
      unsubscribe(processChannel(channel));
    }
  };

  const listeners = {
    onMessage: (message) => {
      const data = util.parseJSON(message);

      if (!data || !data.type) return;

      const handler = handlers[data.type];

      if (!handler) return;
      handler(data.payload);
    },
    //unsubscribe all
    onClose: () => {
      subscribed.forEach(unsubscribe);
    }
  };

  ctx.websocket.on('message', listeners.onMessage);
  ctx.websocket.on('close', listeners.onClose);
});

export default ws;
