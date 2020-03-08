import React from 'react';
import styles from './Header.scss';
import { Logo, HeaderNav, Button } from 'components';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <div className={cx('header')}>
      <div className={cx('logo-wrapper')}>
        <Logo />
      </div>
      <div className={cx('right-side')}>
        <HeaderNav />
        <Button>로그인</Button>
      </div>
    </div>
  );
};

export default Header;
