import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import onClickOutside from 'react-onclickoutside';
import { LoginModal } from 'components';
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';
import * as registerActions from 'store/modules/register';
import validate from 'validate.js';

class LoginModalContainer extends Component {
  handleClose = () => {
    const { visible, BaseActions, AuthActions } = this.props;
    if (!visible) return;
    BaseActions.setScreenMaskVisibility(false);
    AuthActions.toggleLoginModal();
  };

  handleClickOutside = (evt) => {
    this.handleClose();
  };

  handleChangeMode = () => {
    const { mode, AuthActions } = this.props;
    const inverted = mode === 'login' ? 'register' : 'login';
    AuthActions.setModalMode(inverted);
  };

  handleChangeInput = (e) => {
    const { AuthActions } = this.props;
    const { name, value } = e.target;
    AuthActions.changeInput({
      name,
      value
    });
  };

  handleLoginClick = () => {
    console.log('login');
  };

  handleRegisterClick = async () => {
    const { AuthActions } = this.props;

    //reset error
    AuthActions.setError(null);

    //validate email and password
    const constraints = {
      email: {
        email: {
          message: '^잘못된 형식의 이메일입니다'
        }
      },
      password: {
        length: {
          minimum: 6,
          tooShort: '^비밀번호는 %{count}자 이상 입력하세요.'
        }
      }
    };

    const form = this.props.forms.toJS();
    const error = validate(form, constraints);

    if (error) {
      return AuthActions.setError(error);
    }

    try {
      await AuthActions.checkEmail(form.email);
      if (this.props.error) {
        return;
      }
    } catch (e) {
      console.log(e);
    }

    // close the modal, open the register screen
    this.handleClose();
    const { history } = this.props;

    history.push('/register');
  };

  render() {
    const { visible, mode, forms, error } = this.props;

    return (
      <LoginModal
        visible={visible}
        mode={mode}
        forms={forms}
        error={error}
        onChangeMode={this.handleChangeMode}
        onChangeInput={this.handleChangeInput}
        onLogin={this.handleLoginClick}
        onRegister={this.handleRegisterClick}
      />
    );
  }
}

export default connect(
  (state) => ({
    visible: state.auth.getIn(['modal', 'visible']),
    mode: state.auth.getIn(['modal', 'mode']),
    forms: state.auth.get('forms'),
    error: state.auth.get('error')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch),
    RegisterActions: bindActionCreators(registerActions, dispatch)
  })
)(withRouter(onClickOutside(LoginModalContainer)));
