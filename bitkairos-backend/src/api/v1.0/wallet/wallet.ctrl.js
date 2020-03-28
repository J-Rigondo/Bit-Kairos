import User from 'db/model/User';

export const get = async (ctx) => {
  const { user } = ctx.request;

  if (!user) {
    ctx.status = 403;
    return;
  }

  try {
    const userData = await User.findOne({ _id: user._id });
    ctx.body = userData.wallet;
  } catch (e) {
    ctx.throw(e);
  }
};
