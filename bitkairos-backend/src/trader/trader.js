import Rate from 'db/model/Rate';
import log from 'lib/log';
import Order from 'db/model/Order';
import User from 'db/model/User';
import redis from 'redis';

const generalPublisher = redis.createClient();

export default (() => {
  let currentExchangeRates = [];
  let syncTimeoutId = null;

  const makeUserTransaction = async (
    userId,
    currencyPair,
    amount,
    price,
    sell
  ) => {
    let base = currencyPair === 'BTC' ? 'USD' : 'BTC';
    let target = currencyPair;
    //check whether currencyType exists in user's wallet

    amount = parseFloat(amount);
    price = parseFloat(price);
    const totalPrice = amount * price;

    if (sell) {
      let temp = target;
      target = base;
      base = temp;
    }

    console.log(`target:${target}, base:${base}`);

    //buying - up target amount, down base's amount * price

    //selling - up base's amount * price, down target amount

    try {
      const user = await User.findById(userId);
      if (!user) {
        log.error(`User ${userId} not found`);
        return;
      }

      //buy
      if (!sell) {
        return User.findByIdAndUpdate(userId, {
          $inc: {
            [`wallet.${target}`]: amount,
            [`walletOnOrder.${base}`]: -1 * totalPrice
          }
        });
      } else {
        return User.findByIdAndUpdate(userId, {
          $inc: {
            [`wallet.${target}`]: totalPrice,
            [`walletOnOrder.${base}`]: -1 * amount
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const refreshExchangeRates = () => {
    return Rate.find(
      {},
      {
        name: true,
        last: true,
        baseVolume: true
      }
    ).lean();
  };

  const syncExchangeRate = async () => {
    try {
      currentExchangeRates = await refreshExchangeRates();
      await loopThroughCoins();
      log.info('generated sync');
    } catch (e) {
      console.log(e);
    }

    syncTimeoutId = setTimeout(syncExchangeRate, 1000);
  };

  const findAvailableOrders = (rateInfo, sell) => {
    return Order.find({
      status: 'waiting',
      currencyPair: rateInfo.name,
      price: {
        [sell ? '$lte' : '$gte']: rateInfo.last
      },
      sell
    }).lean();
  };

  const processOrder = async (order) => {
    const { _id: orderId, amount, price, userId, currencyPair, sell } = order;
    log(orderId, 'is processed.');

    try {
      await Order.findByIdAndUpdate(orderId, {
        status: 'processed',
        $inc: {
          processedAmount: amount
        }
      });

      await makeUserTransaction(userId, currencyPair, amount, price, sell);

      generalPublisher.publish(
        'general',
        JSON.stringify({
          type: 'ORDER_PROCESSED',
          payload: order
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const loopThroughCoins = async () => {
    let availableOrders = [];

    const findBuyOrders = currentExchangeRates.map((rateInfo) =>
      findAvailableOrders(rateInfo, false)
    );
    const buyOrders = await Promise.all(findBuyOrders);

    buyOrders.forEach((orders) => {
      if (orders.length > 0) {
        availableOrders = availableOrders.concat(orders);
      }
    });

    const findSellOrders = currentExchangeRates.map((rateInfo) =>
      findAvailableOrders(rateInfo, true)
    );
    const sellOrders = await Promise.all(findSellOrders);

    sellOrders.forEach((orders) => {
      if (orders.length > 0) {
        availableOrders = availableOrders.concat(orders);
      }
    });

    availableOrders.map((order) => {
      processOrder(order);
    });

    log.info('active orders', availableOrders);
  };

  return {
    beginSync() {
      syncExchangeRate();
      log.info('sync began');
    },
    endSync() {
      clearTimeout(syncTimeoutId);
      syncTimeoutId = null;
    }
  };
})();
