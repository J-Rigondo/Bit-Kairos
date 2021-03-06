import React from 'react';
import styles from './SocialLoginButton.scss';
import classNames from 'classnames/bind';
import { IoLogoGoogleplus } from 'react-icons/io';
const cx = classNames.bind(styles);

const SocialLoginButton = ({ onSocial }) => {
  return (
    <div className={cx('social-login-button')}>
      <div
        className={cx('google')}
        onClick={() => {
          onSocial('google');
        }}
      >
        <IoLogoGoogleplus />
        <span className={cx('google-text')}>Google</span>
      </div>
    </div>
  );
};

export default SocialLoginButton;
