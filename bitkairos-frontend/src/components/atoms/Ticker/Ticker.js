import React, { Component } from 'react';
import styles from './Ticker.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Ticker extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          proName: 'OANDA:SPX500USD',
          title: 'S&P 500'
        },
        {
          proName: 'OANDA:NAS100USD',
          title: '나스닥 100'
        },
        {
          proName: 'FX_IDC:EURUSD',
          title: 'EUR/USD'
        },
        {
          proName: 'BITSTAMP:BTCUSD',
          title: 'BTC/USD'
        },
        {
          proName: 'BITSTAMP:ETHUSD',
          title: 'ETH/USD'
        },
        {
          proName: 'TVC:UKOIL',
          title: '원유'
        }
      ],
      colorTheme: 'light',
      isTransparent: false,
      locale: 'kr'
    });
    this.myRef.current.appendChild(script);
  }
  render() {
    return (
      <div className="tradingview-widget-container" ref={this.myRef}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    );
  }
}

export default Ticker;
