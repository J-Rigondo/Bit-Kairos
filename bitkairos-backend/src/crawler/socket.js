import websocket from 'websocket';
import * as polo from '../lib/poloniex/index';
import Rate from '../db/model/Rate';
import log from 'lib/log';

const wsClient = websocket.client;

const client = new wsClient();

client.on('connectFailed', (error) => {
  console.log(`Failed to connect to server : ${error.toString()}`);
});

client.on('connect', (connection) => {
  connection.on('error', (error) => {
    console.log(`client connect error ${error.toString()}`);
  });

  connection.on('close', () => {
    console.log('connection closed');
    console.log('reconnecting ...');
    client.connect('wss://api2.poloniex.com');
  });

  connection.on('message', async (message) => {
    const parsed = await JSON.parse(message.utf8Data);
    const [type, meta, data] = parsed;

    if (type === 1002) {
      const temp = polo.convertToTickerObject(data);

      if (temp === null || temp.name === undefined) return;

      const { name, ...rest } = temp;

      try {
        const updated = await Rate.findOneAndUpdate(
          { name },
          { rest },
          { upsert: false, new: true }
        );

        //console.log(`updated: ${name} ${new Date()}`);
        log('updated', name);
      } catch (e) {
        log.error(`update error: ${e}`);
      }
    }
  });

  function sendNumber() {
    if (connection.connected) {
      connection.send(`{"command":"subscribe","channel":"1002"}`);
      setTimeout(sendNumber, 1000);
    }
  }
  sendNumber();
});

function conn() {
  client.connect('wss://api2.poloniex.com');
}

export default conn;
