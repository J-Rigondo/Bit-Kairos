import Router from 'koa-router';
import shortId from 'shortid';
import redis from 'redis';
import lzutf8 from 'lzutf8';

const subscriber = redis.createClient();
subscriber.subscribe('tickers');

const ws = new Router();

const parseJSON = (str) => {
  let parsed = null;

  try {
    parsed = JSON.parse(str);
  } catch (e) {
    return null;
  }
  return parsed;
};

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

  const messageHanlder = {
    [msgTypes.subscribe]: (data) => {
      if (data === 'tickers') {
        subscriber.on('message', listener);
      }
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
    const handler = messageHanlder[parsed.code];
    if (!messageHanlder[parsed.code]) return;
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
