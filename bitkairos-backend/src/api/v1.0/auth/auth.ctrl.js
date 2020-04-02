import Joi from 'joi';
import crypto from 'crypto';
import User from 'db/model/User';
import * as token from 'lib/token';
import { optionCurrency } from 'lib/variables';
import { getProfile } from 'lib/social';

export const checkEmail = async (ctx) => {
  const { email } = ctx.params;
  if (!email) {
    ctx.status = 400;
    return;
  }

  try {
    const account = await User.findOne({ email });

    ctx.body = {
      exists: !!account
    };
  } catch (e) {
    ctx.throw(e, 500);
  }
};

export const checkDisplayName = async (ctx) => {
  const { displayName } = ctx.params;

  try {
    const account = await User.findOne({ displayName });

    ctx.body = {
      exists: !!account
    };
  } catch (e) {
    ctx.throw(e, 500);
  }
};

export const localRegister = async (ctx) => {
  const { PASSWORD_HASH_KEY: secret } = process.env;
  const { body } = ctx.request;

  //type check
  const schema = Joi.object({
    displayName: Joi.string().regex(/^[a-zA-Z0-9가-힣]{3,12}$/),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .max(30),
    initialMoney: Joi.object({
      currency: Joi.string()
        .allow('KRW', 'USD', 'BTC')
        .required(),
      index: Joi.number()
        .min(0)
        .max(2)
        .required()
    })
  });

  const result = Joi.validate(body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { displayName, email, password } = body;

  try {
    //check email existancy
    const exists = await User.findOne({
      $or: [{ displayName }, { email }]
    });

    if (exists) {
      ctx.status = 409;
      const key = exists.email === email ? 'email' : 'displayName';
      ctx.body = {
        key
      };
      return;
    }

    const { currency, index } = body.initialMoney;
    const value = optionCurrency[currency].initialValue * Math.pow(10, index);
    const initial = {
      currency,
      value
    };

    //create user account
    const user = new User({
      displayName,
      email,
      password: crypto
        .createHmac('sha256', secret)
        .update(password)
        .digest('hex'),
      metaInfo: {
        initial
      }
    });
    user.wallet[currency] = value;

    const registResult = await user.save();
    ctx.body = {
      displayName,
      _id: registResult._id
      //metaInfo: registResult.metaInfo
    };

    //create token
    const accessToken = await token.generateToken(
      {
        user: {
          _id: result._id,
          displayName
        }
      },
      'user'
    );

    // configure accessToken to httpOnly cookie
    const temp = ctx.cookies.set('access_token', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });
  } catch (e) {
    console.log(e);
    ctx.throw(500);
  }
};

export const localLogin = async (ctx) => {
  const { PASSWORD_HASH_KEY: secret } = process.env;
  const { body } = ctx.request;

  //type check
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .max(30)
  });

  const result = Joi.validate(body, schema);
  if (result.error) {
    ctx.status = 400;
    return;
  }

  const { email, password } = body;

  try {
    //check email existancy
    const exists = await User.findOne({ email });
    if (!exists) {
      ctx.status = 403;
      return;
    }

    //password check
    const hashed = crypto
      .createHmac('sha256', secret)
      .update(password)
      .digest('hex');

    if (exists.password !== hashed) {
      ctx.status = 403; //wrong password
      return;
    }

    //create token
    const { _id, displayName } = exists;
    const accessToken = await token.generateToken(
      {
        user: {
          _id,
          displayName
        }
      },
      'user'
    );

    //set cookie
    ctx.cookies.set('access_token', accessToken, {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });

    ctx.body = {
      _id,
      displayName
    };
  } catch (e) {
    ctx.throw(e);
  }
};

export const check = (ctx) => {
  const { user } = ctx.request;

  if (!user) {
    ctx.status = 403;
    return;
  }

  ctx.body = {
    user
  };
};

export const socialLogin = async (ctx) => {
  const schema = Joi.object().keys({
    accessToken: Joi.string().required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    return;
  }

  const { provider } = ctx.params;
  const { accessToken } = ctx.request.body;

  let profile = null;
  try {
    profile = await getProfile(provider, accessToken);
  } catch (e) {
    ctx.status = 403;
    return;
  }

  const { id, email } = profile;
  console.log(id, email);

  ctx.body = {
    profile,
    provider,
    accessToken
  };
};

export const logout = (ctx) => {
  ctx.cookies.set('access_token', null, {
    maxAge: 0,
    httpOnly: true
  });
  ctx.status = 204;
};
