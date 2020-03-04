import * as polo from '../lib/poloniex/index';
import Rate from '../db/model/Rate';

export const registerInitialExchangeRate = async () => {
  const tickers = await polo.getTickers();
  const keys = Object.keys(tickers);

  //remove prev-data
  await Rate.remove({});

  //insert rate to db
  const mongoKeys = keys.map(async (key) => {
    const ticker = tickers[key];
    const data = Object.assign({ name: key }, ticker);
    const exchangeRate = await Rate.create(data);
    return exchangeRate.save();
  });

  console.log(mongoKeys, 'success!');
};
