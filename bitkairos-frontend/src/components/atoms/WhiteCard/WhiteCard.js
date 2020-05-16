import React from 'react';
import styles from './WhiteCard.scss';
import className from 'classnames/bind';

const cx = className.bind(styles);

const WhiteCard = ({ children, className, ...rest }) => {
  return (
    <div className={cx('white-card', className)} {...rest}>
      {children}
    </div>
  );
};

export default WhiteCard;
