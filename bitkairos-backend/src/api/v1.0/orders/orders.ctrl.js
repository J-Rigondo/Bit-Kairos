import currencyPairs from 'lib/poloniex/map';
import Joi from 'joi';
import User from 'db/model/User';
import Order from 'db/model/Order';
import mongoose from 'mongoose';
import orders from '.';

export const getOrders = async (ctx) => {
  const { user } = ctx.request;
  const { cursor } = ctx.query;
  console.log(cursor);
  if (!user) {
    ctx.status = 401;
    return;
  }

  try {
    const result = await Order.find({
      userId: user._id,
      ...(cursor ? { _id: { $lt: cursor } } : {}) //limit list 25, inidiciate next url
    })
      .sort({ _id: -1 })
      .limit(25);

    const { protocol, host, path } = ctx;

    const nextUrl = `${protocol}://${host}${path}?cursor=${
      result.length > 0 ? result[result.length - 1]._id : ''
    }`;

    if (orders.length > 0) {
      ctx.response.set('Link', `<${nextUrl}>; rel="next`);
    }

    ctx.body = result;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

export const createOrders = async (ctx) => {
  let { currencyPair, price, amount, sell } = ctx.request.body;
  price = parseFloat(price);
  amount = parseFloat(amount);
  const { user } = ctx.request;

  if (!user) {
    ctx.status = 401;
    return;
  }

  if (Object.values(currencyPairs).indexOf(currencyPair) === -1) {
    ctx.status = 400;
    ctx.body = {
      msg: 'invalid currencyPair'
    };
    return;
  }

  //validate
  const schema = Joi.object({
    currencyPair: Joi.string().required(),
    price: Joi.number().greater(0).required(),
    amount: Joi.number().greater(0).required(),
    sell: Joi.boolean().required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const totalAmount = price * amount;

  try {
    const userData = await User.findById(user._id);
    const { wallet, valid, walletOnOrder } = userData;
    const baseCurrency = (() => {
      if (currencyPair === 'BTC') {
        return sell ? 'BTC' : 'USD';
      } else {
        return sell ? currencyPair : 'BTC';
      }
    })();

    //check Email Authentication
    if (!valid) {
      ctx.status = 400;
      ctx.body = {
        valid
      };
      return;
    }

    if (totalAmount > (wallet[baseCurrency] || 0)) {
      ctx.status = 400;
      ctx.body = {
        msg: 'not enough money'
      };
      return;
    }

    const order = new Order({
      userId: mongoose.Types.ObjectId(user._id),
      currencyPair,
      price,
      amount,
      sell
    });

    if (sell) {
      await User.findByIdAndUpdate(user._id, {
        $inc: {
          [`wallet.${baseCurrency}`]: -1 * amount,
          [`walletOnOrder.${baseCurrency}`]: amount
        }
      });
    } else {
      await User.findByIdAndUpdate(user._id, {
        $inc: {
          [`wallet.${baseCurrency}`]: -1 * totalAmount,
          [`walletOnOrder.${baseCurrency}`]: totalAmount
        }
      });
    }

    await order.save();

    ctx.body = {
      _id: order._id,
      currencyPair,
      price,
      amount,
      sell,
      status: 'waiting'
    };
  } catch (e) {
    console.log(e);
  }
};
