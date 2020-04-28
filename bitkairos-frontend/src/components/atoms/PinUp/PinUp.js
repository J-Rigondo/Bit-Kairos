import React from 'react';
import styles from './PinUp.scss';
import className from 'classnames/bind';
import { TiPin } from 'react-icons/ti';

const cx = className.bind(styles);

const PinUp = ({ toggleShowPinned, showPinned }) => {
  return (
    <div className={cx('pinup')} onClick={toggleShowPinned}>
      <TiPin className={cx({ active: showPinned })} />
    </div>
  );
};

export default PinUp;
