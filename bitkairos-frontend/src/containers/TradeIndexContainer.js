import React, { Component } from 'react';
import { TradeIndex } from 'components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tradeActions from 'store/modules/trade';
import * as userActions from 'store/modules/user';
import socket from 'lib/socket';

const sortKey = {
  alphabet: 'name',
  percentage: 'percentChange',
  price: 'last',
  volume: 'baseVolume'
};

function generatePinMap(list) {
  const object = {};

  list.forEach((key) => {
    object[key] = true;
  });

  return object;
}

class TradeIndexContainer extends Component {
  initialize = () => {
    const { TradeActions } = this.props;
    TradeActions.getInitialRate();
  };

  componentDidMount() {
    this.initialize();
    socket.subscribe('tickers');
  }

  componentWillUnmount() {
    socket.unsubscribe('tickers');
  }

  savePin = () => {
    const { UserActions, pinned } = this.props;
    UserActions.patchMetaInfo({
      pinned: pinned.toJS()
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.pinned !== this.props.pinned) {
      this.savePin();
    }
  }

  handleTogglePin = (key) => {
    const { UserActions } = this.props;
    UserActions.togglePinKey(key);
  };

  render() {
    const { rate, options, pinned } = this.props;
    const { sortBy, asc, showPinned } = options.toJS();

    let sortedRate = rate.sortBy((k) => k.get(sortKey[sortBy]));

    if (!asc) sortedRate = sortedRate.reverse();

    const pinMap = generatePinMap(pinned);

    return (
      <TradeIndex
        rate={sortedRate}
        showPinned={showPinned}
        onTogglePin={this.handleTogglePin}
        pinMap={pinMap}
      />
    );
  }
}

export default connect(
  (state) => ({
    rate: state.trade.get('rate'),
    options: state.trade.getIn(['index', 'options']),
    pinned: state.user.getIn(['metaInfo', 'pinned'])
  }),
  (dispatch) => ({
    TradeActions: bindActionCreators(tradeActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(TradeIndexContainer);
