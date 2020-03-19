import React from 'react';
import styles from './LoginModal.scss';
import classNames from 'classnames/bind';
import {
  Modal,
  Input,
  Button,
  TextButton,
  SocialLoginButton
} from 'components';

const cx = classNames.bind(styles);

const LoginModal = ({ visible, mode, forms, onChangeMode, onChangeInput }) => {
  const modeText = mode === 'login' ? '로그인' : '회원가입';
  const invertedText = mode === 'login' ? '회원가입' : '로그인';
  const { email, password, displayName } = forms.get(mode).toJS();

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
            big
          />
          <Input
            onChange={onChangeInput}
            name="password"
            value={password}
            placeholder="비밀번호"
            type="password"
            fullWidth
            big
          />
          {mode === 'register' && (
            <Input
              onChange={onChangeInput}
              name="displayName"
              value={displayName}
              placeholder="닉네임"
              fullWidth
              big
            />
          )}
          <Button className={cx('login-btn')}>로그인</Button>
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
