import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tradeActions from 'store/modules/trade';
import * as userActions from 'store/modules/user';
import socket from 'lib/socket';
import { TradeSection } from 'components';

let currencyType;
class TradeSectionContainer extends Component {
  rateInitialize = () => {
    const { TradeActions } = this.props;
    TradeActions.getInitialRate();
  };

  sectionInitialize = () => {
    const { currentPrice, TradeActions } = this.props;
    TradeActions.initializeTradeSection(currentPrice);
  };

  handleChangeInput = (type, name, value) => {
    const { TradeActions } = this.props;
    TradeActions.changeTradeBoxInput({
      type,
      name,
      value
    });
  };

  handleRefreshPrice = (type) => {
    const { TradeActions, currentPrice } = this.props;
    TradeActions.changeTradeBoxInput({
      type,
      name: 'price',
      value: currentPrice
    });
  };

  handleCreateOrder = async ({ currencyPair, price, amount, sell }) => {
    const { TradeActions, UserActions } = this.props;

    try {
      await TradeActions.createOrder({
        currencyPair,
        price,
        amount,
        sell
      });
      await UserActions.getWallet();
    } catch (e) {}
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps);
    if (
      prevProps.currencyKey !== this.props.currencyKey ||
      (!prevProps.currentPrice && this.props.currentPrice) ||
      Math.abs(prevProps.currentPrice - this.props.currentPrice) > 8000
    ) {
      this.sectionInitialize();
    }
  }

  componentDidMount() {
    this.rateInitialize();
    socket.subscribe('tickers');
    this.sectionInitialize();
  }

  componentWillUnmount() {
    socket.unsubscribe('tickers');
  }

  render() {
    const { currencyKey, buy, sell, wallet, user, disableButton } = this.props;
    currencyType = currencyKey;

    //must check selectedRate undefined
    return (
      <TradeSection
        currencyKey={currencyKey}
        buy={buy}
        sell={sell}
        onChangeInput={this.handleChangeInput}
        onReFreshPrice={this.handleRefreshPrice}
        wallet={wallet}
        user={user}
        onCreateOrder={this.handleCreateOrder}
        disableButton={disableButton}
      ></TradeSection>
    );
  }
}

export default connect(
  (state, ownProps) => {
    const current = state.trade
      .get('rate')
      .find((r) => r.get('name') === currencyType);

    return {
      currentPrice: current && current.get('last'),
      buy: state.trade.getIn(['tradeSection', 'buy']),
      sell: state.trade.getIn(['tradeSection', 'sell']),
      wallet: state.user.get('wallet'),
      user: state.user.get('user'),
      disableButton: state.trade.getIn(['tradeSection', 'disableButton'])
    };
  },
  (dispatch) => ({
    TradeActions: bindActionCreators(tradeActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(TradeSectionContainer);
