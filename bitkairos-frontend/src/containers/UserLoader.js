import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';
import * as userActions from 'store/modules/user';
import storage from 'lib/storage';

class UserLoader extends Component {
  componentDidMount() {
    const user = storage.get('BIT_USER');
    if (user) {
      const { UserActions } = this.props;
      UserActions.setUser(user);
    }
  }
  render() {
    return null;
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(UserLoader);
