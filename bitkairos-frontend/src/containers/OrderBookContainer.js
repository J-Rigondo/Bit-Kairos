import React, { Component } from 'react';
import { OrderBook } from 'components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tradeActions from 'store/modules/trade';

class OrderBookContainer extends Component {
  timeoutId = null;
  cancel = null;

  getOrderBook = async () => {
    const { TradeActions, currencyKey } = this.props;
    const currencyPair =
      currencyKey === 'BTC' ? 'USDT_BTC' : `BTC_${currencyKey}`;

    try {
      const getOrder = TradeActions.getOrderBook(currencyPair);
      this.cancel = getOrder.cancel;
      console.log(getOrder.cancel);

      await getOrder;
    } catch (e) {
      console.log(e);
    }
  };

  startWork = () => {
    this.clearRepeater();
    this.work();
  };

  work = async () => {
    console.log('I am working getOrderBook');

    await this.getOrderBook();

    if (this.cancel) {
      this.timeoutId = setTimeout(() => {
        this.work();
      }, 250);
    }
  };

  clearRepeater = () => {
    const { TradeActions } = this.props;
    TradeActions.resetOrderBook();

    if (this.cancel) {
      this.cancel();
      this.cancel = null;
    }

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
      console.log('cancelling timeoutId');
    }
  };

  componentDidMount() {
    this.startWork();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currencyKey !== this.props.currencyKey) {
      this.startWork();
    }
  }

  componentWillUnmount() {
    this.clearRepeater();
  }

  render() {
    const { currencyKey: currencyType, orderBook } = this.props;

    return <OrderBook currencyType={currencyType} orderBook={orderBook} />;
  }
}

export default connect(
  (state) => ({
    orderBook: state.trade.get('orderBook')
  }),
  (dispatch) => ({
    TradeActions: bindActionCreators(tradeActions, dispatch)
  })
)(OrderBookContainer);
