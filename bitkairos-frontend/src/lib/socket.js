import lzutf8 from 'lzutf8';
import { updateTicker } from 'store/modules/trade';

const msgTypes = {
  ticker: 1,
  subscribe: 2,
  unsubscribe: 3
};

const parseJSON = (str) => {
  let parsed = null;

  try {
    parsed = JSON.parse(str);
  } catch (e) {
    return null;
  }
  return parsed;
};

function decompress(data) {
  return new Promise((resolve, reject) => {
    lzutf8.decompressAsync(
      data,
      { inputEncoding: 'BinaryString' },
      (result, error) => {
        if (error) reject(error);
        resolve(result);
      }
    );
  });
}

export default (function () {
  let _store = null;
  let _socket = null;
  let _uri = null;
  let _retry = false;
  let _subscribed = [];

  function handlePacket(message) {
    const { type, payload } = message;
    const parsed = parseJSON(payload);
    if (!parsed) return;

    const handlers = {
      TICKER: () => {
        _store.dispatch(updateTicker(parsed));
      }
    };
    handlers[type]();
  }

  const listener = async (message) => {
    try {
      const decompressed = await decompress(message.data);
      const data = parseJSON(decompressed);

      handlePacket(data);
      if (!data || !data.type) return;
    } catch (e) {
      console.log('failed to parse data', e);
    }
  };

  const connect = (uri) => {
    _uri = uri;
    _socket = new WebSocket(uri);
    _socket.onmessage = listener;
    _socket.onopen = (event) => {
      console.log('connected to', uri);
      _retry = false;
      resubscribe();
    };
    _socket.onclose = reconnect;
  };

  const reconnect = () => {
    console.log('reconnecting to socket...');
    if (_retry) {
      //retry after 3 sec
      setTimeout(() => connect(_uri), 3000);
      return;
    }
    _retry = true;
    connect(_uri);
  };

  const subscribe = (key) => {
    if (_subscribed.indexOf(key) === -1) {
      _subscribed.push(key);
    }

    if (_socket.readyState !== _socket.OPEN) return;

    console.log('subscribing to ' + key);
    _socket.send(
      JSON.stringify({
        type: msgTypes.subscribe,
        payload: key
      })
    );
  };

  const resubscribe = () => {
    _subscribed.forEach(subscribe);
    console.log('resubscribing to ' + _subscribed.join(','));
  };

  const unsubscribe = (key) => {
    const idx = _subscribed.indexOf(key);
    if (idx === -1) return;

    _subscribed.splice(idx, 1);
    console.log('unsubscribing ' + key);
    _socket.send(
      JSON.stringify({
        type: msgTypes.unsubscribe,
        payload: key
      })
    );
  };

  return {
    initialize: (store, uri) => {
      _store = store;
      connect(uri);
    },
    subscribe,
    unsubscribe
  };
})();
