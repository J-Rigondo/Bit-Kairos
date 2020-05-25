import React from 'react';
import styles from './TradeBox.scss';
import className from 'classnames/bind';
import { WhiteCard, HrLabelInput } from 'components';

const cx = className.bind(styles);

const TradeBox = ({
  title,
  hasAmount,
  base,
  currencyType,
  price,
  amount,
  sell
}) => {
  return (
    <WhiteCard className={cx('trade-box')}>
      <div className={cx('head')}>
        <div className={cx('title')}>{title}</div>
        <div className={cx('has-amount')}>
          <span className={cx('holding')}>보유량:</span> {hasAmount}
          <span className={cx('TB-currency')}>
            {sell ? currencyType : base}
          </span>
        </div>
      </div>
      <div className={cx('content')}>
        <HrLabelInput label="가격" currency="BTC" />
        <HrLabelInput label={sell ? '매도량' : '매수량'} currency="ETH" />
      </div>
      <div className={cx('content', 'bottom')}>
        <div className={cx('TB-text')}>총 {sell ? '매도' : '매수'} 가격</div>
        <div className={cx('TB-total')}>
          100<span className={cx('base')}>{base}</span>
        </div>
      </div>
    </WhiteCard>
  );
};

TradeBox.defaultProps = {
  title: '타이틀',
  hasAmount: 100,
  base: 'BTC',
  currencyType: 'ETH',
  price: 100,
  amount: 100,
  sell: true
};

export default TradeBox;
