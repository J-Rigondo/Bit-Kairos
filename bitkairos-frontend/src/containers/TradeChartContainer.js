import React, { Component } from 'react';
import { TradeChart } from 'components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';

class TradeChartContainer extends Component {
  render() {
    return <TradeChart />;
  }
}

export default connect(
  (state) => ({
    user: state.user.get('user')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(TradeChartContainer);
