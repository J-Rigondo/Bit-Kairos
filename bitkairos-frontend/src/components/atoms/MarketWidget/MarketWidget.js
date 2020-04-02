import React, { Component } from 'react';

class MarketWidget extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: '100%',
      height: 700,
      defaultColumn: 'overview',
      screener_type: 'crypto_mkt',
      displayCurrency: 'USD',
      colorTheme: 'dark',
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

export default MarketWidget;
