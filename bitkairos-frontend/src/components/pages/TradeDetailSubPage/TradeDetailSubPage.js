import React, { Component } from 'react';
import styles from './TradeDetailSubPage.scss';
import className from 'classnames/bind';
import {
  TradeChartContainer,
  OrderBookContainer,
  TradeSectionContainer
} from 'containers';

const cx = className.bind(styles);

class TradeDetailSubPage extends Component {
  scrollToTop = () => {
    document.body.scrollTop = 0;
  };

  componentDidMount() {
    this.scrollToTop();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.match.params.currencyKey !== this.props.match.params.currencyKey
    ) {
      this.scrollToTop();
    }
  }

  render() {
    const { currencyKey } = this.props.match.params;
    return (
      <div className={cx('tradeDetail-wrapper')}>
        <div className={cx('trade-main')}>{currencyKey}</div>
        <div className={cx('trade-detail')}>
          <TradeChartContainer currencyKey={currencyKey} />
          <TradeSectionContainer />
          <OrderBookContainer currencyKey={currencyKey} />
        </div>
      </div>
    );
  }
}

export default TradeDetailSubPage;
