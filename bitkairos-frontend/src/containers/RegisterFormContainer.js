import React, { Component } from 'react';
import { RegisterForm } from 'components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as registerActions from 'store/modules/register';
import debounce from 'lodash/debounce';
import { withRouter } from 'react-router';

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

  handleSubmit = () => {
    const {
      displayName,
      currency,
      optionIndex,
      authForm,
      RegisterActions
    } = this.props;
    const { email, password } = authForm.toJS();

    RegisterActions.submit({
      displayName,
      email,
      password,
      initialMoney: {
        currency,
        index: optionIndex
      }
    });
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
      displayNameExists
    } = this.props;

    return (
      <RegisterForm
        displayName={displayName}
        currency={currency}
        optionIndex={optionIndex}
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
    optionIndex: state.register.get('optionIndex'),
    displayNameExists: state.register.get('displayNameExists')
  }),
  (dispatch) => ({
    RegisterActions: bindActionCreators(registerActions, dispatch)
  })
)(withRouter(RegisterFormContainer));
