import React from 'react';
import styles from './Button.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Button = ({ children, className, disabled, ...rest }) => {
  return (
    <div
      className={cx(
        'button',
        {
          disabled: disabled
        },
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Button;
