import trader from './trader';
import db from 'db/db';

//sync current price every second
const initialize = async () => {
  await trader.beginSync();
};

initialize();
