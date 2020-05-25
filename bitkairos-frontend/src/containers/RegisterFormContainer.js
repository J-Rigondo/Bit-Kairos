import React, { Component } from 'react';
import { RegisterForm } from 'components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as registerActions from 'store/modules/register';
import * as authActions from 'store/modules/auth';
import * as userActions from 'store/modules/user';
import debounce from 'lodash/debounce';
import { withRouter } from 'react-router-dom';

class RegisterFormContainer extends Component {
  handleChangeDisplayName = (e) => {
    const { value } = e.target;
    const { RegisterActions } = this.props;

    RegisterActions.changeDisplayName(value);
    this.checkDisplayName(value);
  };

  handleSetCurrency = (currency) => {
    const { RegisterActions } = this.props;
    RegisterActions.setCurrency(currency);
  };

  handleSetOptionIndex = (index) => {
    const { RegisterActions } = this.props;
    RegisterActions.setOptionIndex(index);
  };

  handleSubmit = async () => {
    const {
      socialInfo,
      displayName,
      currency,
      optionIndex,
      authForm,
      displayNameExists,
      RegisterActions,
      UserActions,
      history
    } = this.props;

    //displayName check
    if (displayNameExists) {
      return;
    }

    if (displayName.length < 1) {
      RegisterActions.setError('닉네임을 입력하세요');
      return;
    }

    if (displayName.length < 3 || displayName.length > 12) {
      RegisterActions.setError('3~12자리여야합니다.');
      return;
    }

    RegisterActions.setError(null);

    //social register
    if (socialInfo) {
      const { accessToken, provider } = socialInfo;

      try {
        await RegisterActions.socialRegister({
          displayName,
          accessToken,
          provider,
          initialMoney: {
            currency,
            index: optionIndex
          }
        });
        const { result } = this.props;
        UserActions.setUser(result);
        history.push('/');
      } catch (e) {
        console.log(e);
      }

      return;
    }

    //real email exist

    //local register
    const { email, password } = authForm.toJS();

    try {
      await RegisterActions.submit({
        displayName,
        email,
        password,
        initialMoney: {
          currency,
          index: optionIndex
        }
      });

      const { result } = this.props;
      UserActions.setUser(result);
      history.push('/');
    } catch (e) {}
  };

  handleDisplayNameBlur = () => {
    const { displayName, RegisterActions } = this.props;
    RegisterActions.checkDisplayName(displayName);
  };

  handleDisplayName = () => {
    const { displayName, RegisterActions } = this.props;
    RegisterActions.checkDisplayName(displayName);
  };

  checkDisplayName = debounce((value) => {
    const { RegisterActions } = this.props;
    RegisterActions.checkDisplayName(value);
  }, 500);

  render() {
    const {
      displayName,
      currency,
      optionIndex,
      displayNameExists,
      error
    } = this.props;

    return (
      <RegisterForm
        displayName={displayName}
        currency={currency}
        optionIndex={optionIndex}
        error={error}
        displayNameExists={displayNameExists}
        onChangeDisplayName={this.handleChangeDisplayName}
        onSetCurrency={this.handleSetCurrency}
        onSetOptionIndex={this.handleSetOptionIndex}
        onSubmit={this.handleSubmit}
        onDisplayNameBlur={this.handleDisplayNameBlur}
      />
    );
  }
}

export default connect(
  (state) => ({
    authForm: state.auth.get('forms'),
    displayName: state.register.get('displayName'),
    currency: state.register.get('currency'),
    error: state.register.get('error'),
    optionIndex: state.register.get('optionIndex'),
    displayNameExists: state.register.get('displayNameExists'),
    result: state.register.get('result'),
    socialInfo: state.auth.get('socialInfo')
  }),
  (dispatch) => ({
    RegisterActions: bindActionCreators(registerActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(withRouter(RegisterFormContainer));
