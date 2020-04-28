import User from 'db/model/User';
import Joi from 'joi';

export const getMetaInfo = async (ctx) => {
  const { user } = ctx.request;
  if (!user) {
    ctx.status = 403;
    return;
  }

  const { _id } = user;

  try {
    const userData = await User.findById(_id);

    if (!userData) {
      ctx.status = 403;
      return;
    }

    ctx.body = userData.metaInfo;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

export const patchMetaInfo = async (ctx) => {
  //check login status
  const { user } = ctx.request;
  if (!user) {
    ctx.status = 403;
    return;
  }

  const { _id } = user;
  const { body: patchData } = ctx.request;
  const availableFields = {
    pinned: true
  };

  const schema = Joi.object({
    pinned: Joi.array().items(Joi.string().required())
  });

  const valid = Joi.validate(patchData, schema);
  if (valid.error) {
    ctx.body = {
      msg: 'failed to validate patchData'
    };
    ctx.status = 400;
    return;
  }

  for (let field in patchData) {
    if (!availableFields[field]) {
      ctx.status = 403;
      ctx.body = {
        msg: 'unsupported field'
      };
      return;
    }
  }

  try {
    const userData = await User.findById(_id);

    if (!userData) {
      ctx.status = 403;
      return;
    }

    userData.metaInfo = {
      ...userData.metaInfo,
      ...patchData
    };

    await userData.save();

    ctx.body = userData.metaInfo;
  } catch (e) {
    ctx.throw(e, 500);
  }
};
