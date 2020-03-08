import currenyPairMap from './map';
import axios from 'axios';

export const getCurrencyPairId = (id) => {
  return currenyPairMap[id.toString()];
};

export const getTickers = async () => {
  const temp = await axios.get(
    'https://poloniex.com/public?command=returnTicker'
  );
  return temp.data;
};

export const convertToTickerObject = (data) => {
  if (typeof data !== 'object') {
    console.log(`not object : ${data}`);
    return null;
  }

  const keys = [
    'id',
    'last',
    'lowestAsk',
    'highestBid',
    'percentChange',
    'baseVolume',
    'quoteVolume',
    'isFrozen',
    'high24hr',
    'low24hr'
  ];

  const object = {};
  data.forEach((value, i) => {
    if (i === 0) {
      object.name = getCurrencyPairId(value);
      return; //escape arrow function
    }
    const key = keys[i];
    object[key] = value;
  });

  return object;
};
