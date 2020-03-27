import React from 'react';
//import styles from './MoneyOption.scss';
//import classNames from 'classnames/bind';
import { Option } from 'components';
import { optionCurrency } from 'lib/variables';
//const cx = classNames.bind(styles);

const MoneyOption = ({ currency, optionIndex, onSetOptionIndex }) => {
  const info = optionCurrency[currency];
  const options = (() => {
    const multipliers = [1, 10, 100];
    return multipliers.map(
      (multiplier) =>
        info.symbol + (info.initialValue * multiplier).toLocaleString()
    );
  })();

  const optionList = options.map((option, i) => (
    <Option
      key={option}
      active={i === optionIndex}
      onClick={() => onSetOptionIndex(i)}
    >
      {option}
    </Option>
  ));

  return <>{optionList}</>;
};

export default MoneyOption;
