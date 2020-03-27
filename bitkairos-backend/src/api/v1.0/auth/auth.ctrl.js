import Joi from 'joi';
import crypto from 'crypto';
import User from 'db/model/User';
import * as token from 'lib/token';

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
    displayName: Joi.string().regex(/^[a-zA-Z0-9]{3,12}$/),
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
    const exists = await User.findOne({ email });
    if (exists) {
      ctx.status = 409;
      ctx.body = {
        message: 'email exists'
      };
      return;
    }

    //create user account
    const user = new User({
      displayName,
      email,
      password: crypto
        .createHmac('sha256', secret)
        .update(password)
        .digest('hex')
    });
    const registResult = await user.save();
    ctx.body = {
      displayName,
      _id: registResult._id,
      metaInfo: registResult.metaInfo
    };

    console.log(body);
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
    displayName: Joi.string().regex(/^[a-zA-Z0-9]{3,12}$/),
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
    const { _id, displayName, metaInfo } = exists;
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
      displayName,
      _id,
      metaInfo
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
