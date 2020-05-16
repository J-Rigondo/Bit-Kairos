import React from 'react';
import styles from './OrderBook.scss';
import className from 'classnames/bind';
import { WhiteCard, OrdersTable } from 'components';

const cx = className.bind(styles);

const OrderBook = ({ currencyType, orderBook }) => {
  return (
    <div className={cx('orderBook-wrapper')}>
      <div className={cx('OB-column')}>
        <WhiteCard>
          <OrdersTable
            type="매수"
            currency={currencyType}
            data={orderBook && orderBook.get('buy')}
          />
        </WhiteCard>
      </div>
      <div className={cx('OB-column')}>
        <WhiteCard>
          <OrdersTable
            type="매도"
            currency={currencyType}
            data={orderBook && orderBook.get('sell')}
          />
        </WhiteCard>
      </div>
    </div>
  );
};

export default OrderBook;
