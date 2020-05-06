import React from 'react';
import { RateInfoCard } from 'components';
import styles from './TradeIndex.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const TradeIndex = ({ rate, onTogglePin, pinMap, showPinned }) => {
  let filtered = showPinned
    ? rate.filter((info) => pinMap[info.get('name')])
    : rate;

  const rateInfoCardList = filtered.map((info) => (
    <RateInfoCard
      info={info}
      key={info.get('name')}
      keyPair={info.get('name')}
      percentage={info.get('percentChange')}
      volume={info.get('baseVolume')}
      last={info.get('last')}
      onTogglePin={() => onTogglePin(info.get('name'))}
      pinned={pinMap[info.get('name')]}
    />
  ));
  return (
    <div className={cx('trade-index')}>
      <div className={cx('inner')}>{rateInfoCardList}</div>
    </div>
  );
};

export default TradeIndex;
