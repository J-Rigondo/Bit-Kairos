import React, { Component } from 'react';
import styles from './TradeChart.scss';
import className from 'classnames/bind';
import './tv';
const cx = className.bind(styles);

class TradeChart extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    const { currencyKey } = this.props;
    let chartKey;

    if (currencyKey === 'BTC') chartKey = currencyKey + 'USD';
    else chartKey = 'POLONIEX:' + currencyKey + 'BTC';
    //const scriptSrc = document.createElement('script');
    const script = document.createElement('script');
    //scriptSrc.src = 'https://s3.tradingview.com/tv.js';
    //scriptSrc.async = true;

    //"symbol": "POLONIEX:ETHBTC",
    script.innerHTML = `new TradingView.widget(
      {
      "width": "100%",
      "height":500,
      "symbol":"${chartKey}",
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "light",
      "style": "1",
      "locale": "kr",
      "toolbar_bg": "#f1f3f6",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "container_id": "tradingview_7bf97"
    }
      );`;
    //this.myRef.current.appendChild(scriptSrc);
    this.myRef.current.appendChild(script);
  }
  render() {
    return (
      <div className="tradingview-widget-container" ref={this.myRef}>
        <div id="tradingview_7bf97"></div>
      </div>
    );
  }
}

export default TradeChart;
