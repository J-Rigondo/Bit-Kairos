import React from 'react';
import styles from './LoginModal.scss';
import classNames from 'classnames/bind';
import {
  Modal,
  Input,
  Button,
  TextButton,
  SocialLoginButton,
  InputError
} from 'components';

const cx = classNames.bind(styles);

const LoginModal = ({
  visible,
  mode,
  forms,
  error,
  onChangeMode,
  onChangeInput,
  onLogin,
  onRegister
}) => {
  const isLogin = mode === 'login';
  const modeText = isLogin ? '로그인' : '회원가입';
  const invertedText = isLogin ? '회원가입' : '로그인';
  const onButtonClick = isLogin ? onLogin : onRegister;
  const { email, password } = forms.toJS();
  const {
    email: emailError,
    password: passwordError,
    localLogin: localLoginError
  } = error ? error.toJS() : {};

  return (
    <Modal visible={visible}>
      <div className={cx('login-modal')}>
        <div className={cx('bar')} />
        <h2>{modeText}</h2>
        <div className={cx('login-content')}>
          <Input
            onChange={onChangeInput}
            name="email"
            value={email}
            placeholder="이메일"
            fullWidth
          />
          <InputError error={emailError} />
          <Input
            onChange={onChangeInput}
            name="password"
            value={password}
            placeholder="비밀번호"
            type="password"
            fullWidth
          />
          <InputError error={passwordError} />
          <Button className={cx('login-btn')} onClick={onButtonClick}>
            {modeText}
          </Button>
          <InputError error={localLoginError} />
          <div className={cx('textBtn-area')}>
            <TextButton onClick={onChangeMode}>{invertedText}</TextButton>
            <TextButton right>비밀번호 찾기</TextButton>
          </div>
          <div className={cx('separator')}>
            <div className={cx('or')}>OR</div>
          </div>
          <h3>소셜 계정으로 {modeText}</h3>
          <SocialLoginButton />
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
