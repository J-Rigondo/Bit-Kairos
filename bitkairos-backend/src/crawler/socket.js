import websocket from 'websocket';
const wsClient = websocket.client;

const client = new wsClient();

function connect() {
  client.connect('wss://api.poloniex.com', 'echo-protocol');
}

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

  connection.on('message', (message) => {
    console.log(message);
  });
});
