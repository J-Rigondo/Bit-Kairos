import websocket from 'websocket';
import * as polo from '../lib/poloniex/index';
import Rate from '../db/model/Rate';

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
    //TODO reconnect
  });

  connection.on('message', async (message) => {
    const parsed = await JSON.parse(message.utf8Data);
    const [type, meta, data] = parsed;

    if (type === 1002) {
      const temp = polo.convertToTickerObject(data);
      const { name, ...rest } = temp;

      try {
        const updated = await Rate.findOneAndUpdate(
          { name },
          { rest },
          { upsert: false, new: true }
        );

        console.log(updated);
      } catch (e) {
        console.log(`update error: ${e}`);
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

client.connect('wss://api2.poloniex.com');
