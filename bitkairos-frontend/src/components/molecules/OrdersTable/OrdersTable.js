import React from 'react';
import styles from './OrdersTable.scss';
import className from 'classnames/bind';

const cx = className.bind(styles);

const Row = ({ price, volume }) => {
  const digits = 10 - Math.round(Math.log10(volume));

  return (
    <div className={cx('row')}>
      <div className={cx('value')}>{price}</div>
      <div className={cx('value')}>
        {volume.toFixed(digits > 10 ? 10 : digits)}
      </div>
    </div>
  );
};

const OrdersTable = ({ type, currency, data }) => {
  const rows =
    data &&
    data.map((order) => {
      const [price, volume] = order.toJS();
      return <Row key={price} price={price} volume={volume} />;
    });
  return (
    <div className={cx('orders-table')}>
      <div className={cx('order-title')}>{type}주문</div>
      <div className={cx('order-info')}>
        <div className={cx('col-desc')}>
          가격 ({currency === 'BTC' ? 'USD' : 'BTC'})
        </div>
        <div className={cx('col-desc')}>
          {type}량 ({currency})
        </div>
      </div>
      {rows}
    </div>
  );
};

export default OrdersTable;
