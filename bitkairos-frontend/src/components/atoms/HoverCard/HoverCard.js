import React from 'react';
import styles from './HoverCard.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Card = ({ hover, className, ...rest }) => {
  return (
    <div className={cx('hover-card', { hover }, className)} {...rest}></div>
  );
};

export default Card;
