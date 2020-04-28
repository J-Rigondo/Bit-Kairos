import React from 'react';
import styles from './SortReverser.scss';
import className from 'classnames/bind';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

const cx = className.bind(styles);

const SortReverser = ({ asc, onToggle }) => {
  return (
    <div className={cx('sort-reverser', { asc })} onClick={onToggle}>
      {asc ? <FaSortAmountUp /> : <FaSortAmountDown />}
    </div>
  );
};

export default SortReverser;
