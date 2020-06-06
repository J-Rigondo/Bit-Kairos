import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';
import * as userActions from 'store/modules/user';
import storage from 'lib/storage';

class UserLoader extends Component {
  checkLoginStatus = async () => {
    const { UserActions } = this.props;
    const user = storage.get('BIT_USER');
    if (user) {
      UserActions.setUser(user);
    }

    try {
      await UserActions.checkLoginStatus();
      await UserActions.getMetaInfo();
      await UserActions.getWallet();

      if (!user || user._id !== this.props.user.get('_id')) {
        storage.set('BIT_USER', this.props.user.toJS());
      }
    } catch (e) {
      storage.remove('BIT_USER');
      return;
    }
  };

  componentDidUpdate(prevProps, prevState) {
    //recheck login status when userId changes
    if (!prevProps.user && this.props.user) {
      this.checkLoginStatus();
    }
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  render() {
    return null;
  }
}

export default connect(
  (state) => ({
    user: state.user.get('user')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(UserLoader);
