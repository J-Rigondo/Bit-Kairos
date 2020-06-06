import React from 'react';
import styles from './TradeSection.scss';
import className from 'classnames/bind';
import { TradeBox } from 'components';

const cx = className.bind(styles);

const TradeSection = ({
  currencyKey,
  buy,
  sell,
  onChangeInput,
  wallet,
  onReFreshPrice,
  user,
  onCreateOrder,
  disableButton
}) => {
  const onChangeFor = (type) => (e) => {
    const { name, value } = e.target;
    onChangeInput(type, name, value);
  };

  const base = currencyKey === 'BTC' ? 'USD' : 'BTC';
  const currencyPair = currencyKey === 'BTC' ? 'USD' : currencyKey;

  const has = {
    from: wallet.get(base) || 0,
    to: wallet.get(currencyKey) || 0
  };

  return (
    <div className={cx('trade-section')}>
      <TradeBox
        currencyKey={currencyKey}
        {...buy.toJS()}
        onChange={onChangeFor('buy')}
        hasAmount={has.from}
        onReFreshPrice={onReFreshPrice}
        user={user}
        onCreateOrder={() => {
          onCreateOrder({
            currencyPair,
            ...buy.toJS(),
            sell: false
          });
        }}
        disabled={disableButton.get('buy')}
      />
      <TradeBox
        currencyKey={currencyKey}
        {...sell.toJS()}
        onChange={onChangeFor('sell')}
        hasAmount={has.to}
        onReFreshPrice={onReFreshPrice}
        user={user}
        onCreateOrder={() => {
          onCreateOrder({
            currencyPair,
            ...sell.toJS(),
            sell: true
          });
        }}
        disabled={disableButton.get('sell')}
        sell
      />
    </div>
  );
};

export default TradeSection;
