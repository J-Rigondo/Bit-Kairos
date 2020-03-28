import React from 'react';
import styles from './Header.scss';
import { Logo, HeaderNav, Button, UserButton } from 'components';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Header = ({ onLoginButtonClick, user }) => {
  return (
    <div className={cx('header')}>
      <div className={cx('logo-wrapper')}>
        <Logo />
      </div>
      <div className={cx('right-side')}>
        <HeaderNav />
        {user ? (
          <UserButton displayName={user.get('displayName')} />
        ) : (
          <Button className={cx('header-btn')} onClick={onLoginButtonClick}>
            로그인
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
