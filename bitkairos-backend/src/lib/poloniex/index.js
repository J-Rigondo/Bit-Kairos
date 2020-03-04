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
