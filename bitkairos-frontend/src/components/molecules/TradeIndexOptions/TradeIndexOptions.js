import React, { Component } from 'react';
import styles from './TradeIndexOptions.scss';
import className from 'classnames/bind';
import { Selector, SortReverser, PinUp } from 'components';
import { sorterOptions } from 'lib/variables';

const cx = className.bind(styles);

class TradeIndexOptions extends Component {
  render() {
    const {
      sortBy,
      asc,
      onToggleAsc,
      onSelectSort,
      onToggleShowPinned,
      showPinned
    } = this.props;

    return (
      <div>
        <div className={cx('select-options')}>
          <Selector
            sortBy={sortBy}
            options={sorterOptions}
            onSelect={onSelectSort}
          />
          <PinUp
            toggleShowPinned={onToggleShowPinned}
            showPinned={showPinned}
          />
          <SortReverser asc={asc} onToggle={onToggleAsc} />
        </div>
      </div>
    );
  }
}

export default TradeIndexOptions;
