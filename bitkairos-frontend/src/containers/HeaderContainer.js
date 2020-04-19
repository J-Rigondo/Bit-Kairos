import React, { Component } from 'react';
import { Header } from 'components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';
import * as userActions from 'store/modules/user';

class HeaderContainer extends Component {
  handleLoginButtonClick = () => {
    const { BaseActions, AuthActions } = this.props;
    BaseActions.setScreenMaskVisibility(true);
    AuthActions.toggleLoginModal();
    AuthActions.setModalMode('login');
  };

  handleLogoutClick = () => {
    const { UserActions } = this.props;
    UserActions.logout();
    window.location.href = '/';
  };

  render() {
    const { user } = this.props;

    return (
      <Header
        user={user}
        onLoginButtonClick={this.handleLoginButtonClick}
        onLogoutClick={this.handleLogoutClick}
      />
    );
  }
}

export default connect(
  (state) => ({
    user: state.user.get('user'),
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
  })
)(HeaderContainer);
