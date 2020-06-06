import Joi from 'joi';
import crypto from 'crypto';
import User from 'db/model/User';
import * as token from 'lib/token';
import { optionCurrency } from 'lib/variables';
import { getProfile } from 'lib/social';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import generatePwd from 'generate-password';

dotenv.config();

export const realCheck = async (ctx) => {
  const { email } = ctx.params;

  try {
    await User.findOneAndUpdate(
      { email },
      { valid: true },
      { upsert: false, new: true }
    );
  } catch (e) {
    ctx.throw(e, 500);
  }

  ctx.body = `<div style="border:1px solid; position:absolute; border-radius:1rem;
  text-align:center;top:50%; left:50%; transform:translate(-50%,-60%); padding:5rem; ">
 <h1> 비트 카이로스 계정 등록을 환영합니다!</h1>
  <h2 style="font-weight:500; ">실제와 같은 환경에서 트레이딩을 연습하세요! </h2>
 </div>`;
};

export const realEmail = (ctx) => {
  const { email } = ctx.params;

  try {
    const mailConfig = {
      service: 'Naver',
      host: 'smtp.naver.com',
      port: 9000,
      auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASSWORD
      }
    };

    const url = `http://localhost:4000/api/v1.0/auth/real-check/${email}`;

    let message = {
      from: process.env.MAIL_EMAIL,
      to: email,
      subject: 'BITKAIROS 이메일 인증 URL입니다.',
      html: `<h2> URL을 클릭하여 인증을 완료하세요! </h2> <h1><a href='${url}'>인증 URL 클릭</a></h1>`
    };

    let transporter = nodemailer.createTransport(mailConfig);
    transporter.sendMail(message);
  } catch (error) {
    ctx.throw(e, 500);
  }
};

export const findPwd = async (ctx) => {
  const { email } = ctx.params;
  const { PASSWORD_HASH_KEY: secret } = process.env;

  const password = generatePwd.generate({
    length: 10,
    numbers: true
  });

  const cryptoPwd = crypto
    .createHmac('sha256', secret)
    .update(password)
    .digest('hex');

  try {
    await User.findOneAndUpdate(
      { email },
      { password: cryptoPwd },
      { upsert: false, new: true }
    );

    const mailConfig = {
      service: 'Naver',
      host: 'smtp.naver.com',
      port: 9000,
      auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASSWORD
      }
    };

    let message = {
      from: process.env.MAIL_EMAIL,
      to: email,
      subject: 'BITKAIROS 임시 비밀번호입니다.',
      html: `<h1> 임시 비밀번호는 ${password}입니다.  </h1>`
    };

    let transporter = nodemailer.createTransport(mailConfig);
    transporter.sendMail(message);
  } catch (error) {
    ctx.throw(e, 500);
  }

  ctx.body = `<p>${cryptoPwd}<p>`;
};

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
    displayName: Joi.string()
      .regex(/^[a-zA-Z0-9가-힣]{3,12}$/)
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30),
    initialMoney: Joi.object({
      currency: Joi.string().allow('KRW', 'USD', 'BTC').required(),
      index: Joi.number().min(0).max(2).required()
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
          _id: registResult._id,
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
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30)
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
    if (!exists || !exists.valid) {
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
    const { _id, displayName, valid } = exists;
    const accessToken = await token.generateToken(
      {
        user: {
          _id,
          displayName,
          valid
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
      displayName,
      valid
    };
  } catch (e) {
    ctx.throw(e);
  }
};

//login status check
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

  //google auth
  let profile = null;
  try {
    profile = await getProfile(provider, accessToken);
  } catch (e) {
    ctx.status = 403;
    return;
  }
  if (!profile) {
    ctx.status = 403;
    return;
  }

  const { id, email } = profile;

  //check social account existence
  let user = null;
  try {
    const key = `social.${provider}.id`;
    user = await User.findOne({
      [key]: id
    });
  } catch (e) {
    ctx.throw(e);
  }

  if (user) {
    const { _id, displayName } = user;
    try {
      const newToken = await token.generateToken(
        {
          user: {
            _id,
            displayName
          }
        },
        'user'
      );
      ctx.cookies.set('access_token', newToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
      });
    } catch (e) {
      ctx.throw(e);
    }
    ctx.body = {
      _id,
      displayName
    };
    return;
  }

  //merge duplicated email
  if (!user && email) {
    let dupl = null;
    try {
      dupl = await User.findOne({ email });
    } catch (e) {
      ctx.throw(e);
    }

    if (dupl) {
      dupl.social[provider] = {
        id,
        accessToken
      };

      try {
        await dupl.save();
      } catch (e) {
        ctx.throw(e);
      }

      const { _id, displayName } = dupl;
      try {
        const newToken = await token.generateToken(
          {
            user: {
              _id,
              displayName
            }
          },
          'user'
        );
        ctx.cookies.set('access_token', newToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7
        });
      } catch (e) {
        ctx.throw(e);
      }

      ctx.body = {
        _id,
        displayName
      };
    }
  }
  ctx.body = {
    accessToken,
    provider
  };
};

export const socialRegister = async (ctx) => {
  const { body } = ctx.request;
  const { provider } = ctx.params;

  const schema = Joi.object({
    displayName: Joi.string()
      .regex(/^[a-zA-Z0-9가-힣]{3,12}$/)
      .required(),
    accessToken: Joi.string().required(),
    initialMoney: Joi.object({
      currency: Joi.string().allow('KRW', 'USD', 'BTC').required(),
      index: Joi.number().min(0).max(2).required()
    })
  });

  const result = Joi.validate(body, schema);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { displayName, accessToken, initialMoney } = body;

  //check google auth
  let profile = null;
  try {
    profile = await getProfile(provider, accessToken);
  } catch (e) {
    ctx.status = 403;
  }

  if (!profile) {
    ctx.status = 403;
    return;
  }

  const { email: socialEmail, id: socialId } = profile;

  //check email existence
  try {
    const exists = await User.findOne({ email: socialEmail });
    if (exists) {
      ctx.body = {
        key: 'email'
      };
      ctx.status = 409;
      return;
    }
  } catch (e) {
    ctx.throw(e);
  }

  //check displayName existence
  try {
    const exists = await User.findOne({ displayName });
    if (exists) {
      ctx.body = {
        key: 'displayName'
      };
      ctx.status = 409;
    }
  } catch (e) {
    ctx.throw(e);
  }

  //initialMoney setting
  const { currency, index } = initialMoney;
  const value = optionCurrency[currency].initialValue * Math.pow(10, index);
  const initial = {
    currency,
    value
  };

  const newUser = new User({
    displayName,
    email: socialEmail,
    social: {
      [provider]: {
        id: socialId,
        accessToken
      }
    },
    metaInfo: {
      initial
    },
    valid: true,
    initial
  });

  newUser.wallet[currency] = value;
  let saveResult = null;
  try {
    saveResult = await newUser.save();
  } catch (e) {
    ctx.throw(e);
  }

  const { _id, displayName: saveName } = saveResult;
  ctx.body = {
    displayName: saveName,
    _id
  };

  try {
    const newToken = await token.generateToken(
      {
        user: {
          _id,
          displayNam: saveName
        }
      },
      'user'
    );
    ctx.cookies.set('access_token', newToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });
  } catch (e) {
    ctx.throw(e);
  }
};

export const logout = (ctx) => {
  ctx.cookies.set('access_token', null, {
    maxAge: 0,
    httpOnly: true
  });
  ctx.status = 204;
};
