import Router from 'koa-router';
import shortId from 'shortid';
import redis from 'redis';

const subscriber = redis.createClient();
subscriber.subscribe('tickers');

const ws = new Router();

const msgTypes={
  ticker:1
}

ws.get('/ws', (ctx, next) => {
  const id = shortId.generate();
  ctx.websocket.id = id;

  const listener = (channel,message)=>{
    if(channel === 'tickers'){
      const msg = JSON.stringify({
        code:msgTypes.ticker,
        data:message
      });
      ctx.websocket.send(msg);
    }
  })

  subscriber.on('message',listener);

  ctx.websocket.on('close',()=>{
    subscriber.removeListener(listener);
  })
  // ctx.websocket.on('message', function (msg) {
  //   console.log('message');
  // });
});

export default ws;
