import React, { Component } from 'react';
import { TradeIndexOptions } from 'components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tradeActions from 'store/modules/trade';

class TradeIndexOptionsContainer extends Component {
  handleToggleAsc = () => {
    const { TradeActions, options } = this.props;
    const asc = options.get('asc');
    TradeActions.setIndexOption({
      name: 'asc',
      value: !asc
    });
  };

  handleSelectSort = (value) => {
    const { TradeActions } = this.props;
    TradeActions.setIndexOption({
      name: 'sortBy',
      value
    });
  };

  handleToggleShowPinned = () => {
    const { TradeActions } = this.props;
    TradeActions.toggleShowPinned();
  };

  render() {
    const { options } = this.props;
    const { sortBy, asc, showPinned } = options.toJS();

    return (
      <TradeIndexOptions
        sortBy={sortBy}
        asc={asc}
        onToggleAsc={this.handleToggleAsc}
        onSelectSort={this.handleSelectSort}
        onToggleShowPinned={this.handleToggleShowPinned}
        showPinned={showPinned}
      />
    );
  }
}

export default connect(
  (state) => ({
    options: state.trade.getIn(['index', 'options'])
  }),
  (dispatch) => ({
    TradeActions: bindActionCreators(tradeActions, dispatch)
  })
)(TradeIndexOptionsContainer);
