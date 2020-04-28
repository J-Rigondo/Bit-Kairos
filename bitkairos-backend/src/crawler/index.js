import * as polo from '../lib/poloniex/index';
import Rate from '../db/model/Rate';
import currenyPairMap from 'lib/poloniex/map';
import socket from './socket';

const initialize = async () => {
  await registerInitialExchangeRate();
  socket();
};

export const registerInitialExchangeRate = async () => {
  const tickers = await polo.getTickers();
  const keys = Object.keys(tickers);

  //remove prev-data
  await Rate.deleteMany({});

  //insert rate to db
  const mongoKeys = keys.map((key) => {
    const ticker = tickers[key];

    if (!currenyPairMap[ticker.id.toString()]) {
      return;
    }

    const data = Object.assign({ name: key }, ticker);
    const exchangeRate = new Rate(data);
    return exchangeRate.save();
  });

  try {
    await Promise.all(mongoKeys);
  } catch (e) {
    console.log(e);
  }

  //console.log(mongoKeys, 'success!');
};

initialize();
