import Joi from 'joi';
import crypto from 'crypto';
import User from 'db/model/User';
import token from 'lib/token';

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
      .max(30)
  });

  const result = Joi.validate(body, schema);
  if (result.error) {
    ctx.status = 400;
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
    const result = await user.save();
    ctx.body = result;

    const accessToken = await token(
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
    ctx.throw(500);
  }
};
