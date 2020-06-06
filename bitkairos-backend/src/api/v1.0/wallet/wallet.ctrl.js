import User from 'db/model/User';

export const get = async (ctx) => {
  const { user } = ctx.request;

  if (!user) {
    ctx.status = 403;
    return;
  }

  try {
    const userData = await User.findOne({ _id: user._id });
    const { wallet, walletOnOrder } = userData;
    ctx.body = {
      wallet,
      walletOnOrder
    };
  } catch (e) {
    ctx.throw(e);
  }
};
