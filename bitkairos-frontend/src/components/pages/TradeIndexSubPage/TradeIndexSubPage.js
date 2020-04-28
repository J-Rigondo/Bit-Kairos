import React from 'react';
import { TradeIndexContainer, TradeIndexOptionsContainer } from 'containers';
import styles from './TradeIndexSubPage.scss';
import className from 'classnames/bind';

const cx = className.bind(styles);

const TradeIndexSubPage = () => {
  return (
    <div className={cx('trade-wrapper')}>
      <div className={cx('trade-index-subpage')}>
        <TradeIndexOptionsContainer />
        <TradeIndexContainer />
      </div>
    </div>
  );
};

export default TradeIndexSubPage;
