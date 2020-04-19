import React from 'react';
import { HoverCard, RateInfoCard } from 'components';
import styles from './TradeIndex.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const TradeIndex = ({ rate }) => {
  const rateInfoCardList = rate.map((info) => (
    <RateInfoCard key={info.get('name')} />
  ));
  return (
    <div className={cx('trade-index')}>
      <div className={cx('inner')}>{rateInfoCardList}</div>
    </div>
  );
};

export default TradeIndex;
