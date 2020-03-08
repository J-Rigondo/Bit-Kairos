import React from 'react';
import styles from './Background.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Background = () => {
  return (
    <div className={cx('background-main')}>
      <h1 className={cx('back-title')}>
        가장 신뢰받는 글로벌 표준 암호화폐 거래소
      </h1>
      <span className={cx('back-sub')}>
        안전하고 투명한 시스템으로 빠르고 편리한 거래 환경을 제공합니다.
      </span>
      <i className={cx('bit-icon')} />
      <i className={cx('nav-icon')} />
      <i className={cx('x-icon')} />
      <i className={cx('l-icon')} />
    </div>
  );
};

export default Background;
