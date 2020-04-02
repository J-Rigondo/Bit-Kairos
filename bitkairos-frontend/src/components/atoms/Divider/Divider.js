import React from 'react';
import styles from './Divider.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Divider = () => {
  return (
    <div className={cx('divide')}>
      <h1>실시간 가상화폐 시세 확인</h1>
    </div>
  );
};

export default Divider;
