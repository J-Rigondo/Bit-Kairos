import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import onClickOutside from 'react-onclickoutside';
import { LoginModal } from 'components';
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';

class LoginModalContainer extends Component {
  handleClickOutside = (evt) => {
    const { visible, BaseActions, AuthActions } = this.props;
    if (!visible) return;
    BaseActions.setScreenMaskVisibility(false);
    AuthActions.toggleLoginModal();
  };

  handleChangeMode = () => {
    const { mode, AuthActions } = this.props;
    const inverted = mode === 'login' ? 'register' : 'login';
    AuthActions.setModalMode(inverted);
  };

  handleChangeInput = (e) => {
    const { AuthActions, mode } = this.props;
    const { name, value } = e.target;
    AuthActions.changeInput({
      forms: mode,
      name,
      value
    });
  };

  render() {
    const { visible, mode, forms } = this.props;

    return (
      <LoginModal
        visible={visible}
        mode={mode}
        forms={forms}
        onChangeMode={this.handleChangeMode}
        onChangeInput={this.handleChangeInput}
      />
    );
  }
}

export default connect(
  (state) => ({
    visible: state.auth.getIn(['modal', 'visible']),
    mode: state.auth.getIn(['modal', 'mode']),
    forms: state.auth.get('forms')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(onClickOutside(LoginModalContainer));
