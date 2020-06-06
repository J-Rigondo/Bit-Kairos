import React from 'react';
import styles from './TradeBox.scss';
import className from 'classnames/bind';
import { WhiteCard, HrLabelInput, Button } from 'components';
import { limitDigit } from 'lib/utils';

const cx = className.bind(styles);

const TradeBox = ({
  hasAmount,
  price,
  amount,
  sell,
  currencyKey,
  onChange,
  onReFreshPrice,
  user,
  onCreateOrder,
  disabled
}) => {
  const actionText = sell ? '매도' : '매수';
  const inputSetting = {
    type: 'number',
    min: '0',
    inputMode: 'numeric',
    pattern: '[0-9]*'
  };
  const secondaryCurrency = currencyKey === 'BTC' ? 'USD' : 'BTC';

  const onCalculate = () => {
    onChange({
      target: {
        name: 'amount',
        value: sell ? hasAmount : parseFloat(hasAmount) / parseFloat(price)
      }
    });
  };
  return (
    <WhiteCard className={cx('trade-box')}>
      <div className={cx('head', { sell })}>
        <div className={cx('title')}>
          {currencyKey}
          {actionText}
        </div>
        <div className={cx('has-amount')}>
          <span className={cx('holding')}>보유량:</span>
          {limitDigit(hasAmount, 8)}
          <span className={cx('TB-currency')}>
            {sell ? currencyKey : secondaryCurrency}
          </span>
        </div>
      </div>
      <div className={cx('content')}>
        <div className={cx('calc-helper')}>
          <div
            className={cx('help-button')}
            onClick={() => onReFreshPrice(sell ? 'sell' : 'buy')}
          >
            가격 새로고침
          </div>
          <div className={cx('help-button')}>시장가 {actionText}</div>
          <div className={cx('help-button')} onClick={onCalculate}>
            100%{actionText}
          </div>
        </div>
        <HrLabelInput
          {...inputSetting}
          label="가격"
          currency={secondaryCurrency}
          value={price}
          onChange={onChange}
          name="price"
        />
        <HrLabelInput
          {...inputSetting}
          label={actionText + '량'}
          currency={currencyKey}
          value={amount}
          onChange={onChange}
          name="amount"
        />
      </div>
      <div className={cx('content', 'blue')}>
        <div className={cx('TB-text')}>총 {actionText} 가격</div>
        <div className={cx('TB-total')}>
          {limitDigit(parseFloat(price) * parseFloat(amount))}
          <span className={cx('base')}>{secondaryCurrency}</span>
        </div>
      </div>
      <div className={cx('content', 'btn')}>
        {user && user.toJS().valid ? (
          <Button
            className={cx('trade-btn', { sell })}
            flex
            onClick={onCreateOrder}
            disabled={disabled}
          >
            {actionText}
          </Button>
        ) : (
          <Button className={cx('invalid-btn')} flex>
            로그인 및 계정활성화가 필요합니다.
          </Button>
        )}
      </div>
    </WhiteCard>
  );
};

TradeBox.defaultProps = {
  title: '타이틀',
  hasAmount: 100,
  base: 'BTC',
  currencyKey: 'ETH',
  price: 100,
  amount: 100
};

export default TradeBox;
