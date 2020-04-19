import Rate from 'db/model/Rate';

export const getInitialExchangeRate = async (ctx) => {
  try {
    const rates = await Rate.find({});
    ctx.body = rates;
  } catch (e) {
    ctx.throw(e, 500);
  }
};
