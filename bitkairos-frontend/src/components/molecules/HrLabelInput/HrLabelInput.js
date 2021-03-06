import React from 'react';
import styles from './HrLabelInput.scss';
import className from 'classnames/bind';
import { Input } from 'components';

const cx = className.bind(styles);

const HrLabelInput = ({ label, currency, ...rest }) => {
  return (
    <div className={cx('horizontal-label-input')}>
      <label>{label}</label>
      <Input {...rest} />
      {currency && <div className={cx('currency-unit')}>{currency}</div>}
    </div>
  );
};

export default HrLabelInput;
