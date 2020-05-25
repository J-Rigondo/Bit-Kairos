import React from 'react';
import styles from './TradeSection.scss';
import className from 'classnames/bind';
import { TradeBox } from 'components';

const cx = className.bind(styles);

const TradeSection = () => {
  return (
    <div className={cx('trade-section')}>
      <TradeBox title={'매수'} />
      <TradeBox title={'매도'} />
    </div>
  );
};

export default TradeSection;
