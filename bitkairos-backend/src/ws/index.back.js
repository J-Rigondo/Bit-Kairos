import Router from 'koa-router';
import shortId from 'shortid';
import redis from 'redis';
import lzutf8 from 'lzutf8';
import { tokenCheck } from 'lib/middlewares/jwt';
import EventEmitter from 'events';
import log from 'lib/log';

const emitter = new EventEmitter();
emitter.setMaxListeners(0); //infinite

const parseJSON = (str) => {
  let parsed = null;

  try {
    parsed = JSON.parse(str);
  } catch (e) {
    return null;
  }
  return parsed;
};

const handlers = {
  ORDER_PROCESSED: (payload) => {
    emitter.emit(
      `ORDER_PROCESSED:${payload.userId}`,
      JSON.stringify({
        type: 'ORDER_PROCESSED',
        payload
      })
    );
  }
};

const subscriber = redis.createClient();
const generalSubscriber = redis.createClient();

subscriber.subscribe('tickers');
generalSubscriber.subscribe('general');
generalSubscriber.on('message', (channel, message) => {
  const parsed = parseJSON(message);

  if (!parsed) return;

  const { type, payload } = parsed;

  if (!handlers[type]) {
    log.error('UNRESOLVED MESSAGE: ', parsed);
    return;
  }
});

const ws = new Router();

function compress(str) {
  return new Promise((resolve, reject) => {
    lzutf8.compressAsync(
      str,
      { outputEncoding: 'BinaryString' },
      (result, error) => {
        if (error) reject(error);
        resolve(result);
      }
    );
  });
}

const msgTypes = {
  ticker: 1,
  subscribe: 2,
  unsubscribe: 3
};

ws.get('/ws', (ctx, next) => {
  const id = shortId.generate();
  ctx.websocket.id = id;

  const user = ctx.request.user;
  const subscribed = [];

  const generalListener = (payload) => {
    console.log(payload);
  };

  const listener = async (channel, message) => {
    if (channel === 'tickers') {
      const msg = JSON.stringify({
        code: msgTypes.ticker,
        data: message
      });

      try {
        const compressed = await compress(msg);
        ctx.websocket.send(compressed);
      } catch (e) {
        ctx.throw(e);
      }
    }
  };

  const subscribeHandlers = {
    ORDER_PROCESSED: () => {
      const key = `ORDER_PPROCESSED:${user._id}`;
      subscribed.push(key);
    }
  };

  const messageHandler = {
    [msgTypes.subscribe]: (data) => {
      if (data === 'tickers') {
        subscriber.on('message', listener);
        return;
      }

      if (!subscribers[data]) return;
      subscribers[data]();
    },
    [msgTypes.unsubscribe]: (data) => {
      if (data === 'tickers') {
        subscriber.removeListener('message', listener);
      }
    }
  };

  ctx.websocket.on('message', (message) => {
    const parsed = parseJSON(message);
    if (!parsed || !parsed.code) return;
    const handler = messageHandler[parsed.code];
    if (!messageHandler[parsed.code]) return;
    handler(parsed.data);
  });

  ctx.websocket.on('close', () => {
    subscriber.removeListener('message', listener);
  });
  // ctx.websocket.on('message', function (msg) {
  //   console.log('message');
  // });
});

export default ws;
