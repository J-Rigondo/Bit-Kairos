import React from 'react';
import styles from './Button.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Button = ({ children, className, onClick, disabled, flex, ...rest }) => {
  return (
    <div
      className={cx(
        'button',
        {
          disabled: disabled,
          flex: flex
        },
        className
      )}
      onClick={disabled ? undefined : onClick}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Button;
