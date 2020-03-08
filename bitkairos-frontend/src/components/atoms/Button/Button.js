import React from 'react';
import styles from './Button.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Button = ({ children, roundCorner }) => {
  return (
    <div
      className={cx('button', {
        'round-corner': roundCorner
      })}
    >
      {children}
    </div>
  );
};

export default Button;
