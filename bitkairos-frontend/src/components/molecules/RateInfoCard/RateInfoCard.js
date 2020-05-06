import React, { Component } from 'react';
import styles from './RateInfoCard.scss';
import classNames from 'classnames/bind';
import { HoverCard } from 'components';
import { TiPin } from 'react-icons/ti';
import { currency_name } from 'lib/variables';
import { withRouter } from 'react-router';

const cx = classNames.bind(styles);

class RateInfoCard extends Component {
  state = {
    highlight: false,
    greater: true
  };

  timeoutId = null;

  handleOpenCurrency = () => {
    const { history, keyPair } = this.props;
    history.push(`/trade/${keyPair}`);
  };

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.info !== nextProps.info ||
      this.props.pinned !== nextProps.pinned ||
      this.state.highlight !== nextState.highlight ||
      this.state.greater !== nextState.greater
    );
  }

  highlight = (greater) => {
    console.log('hihihihihi', greater, this.props.keyPair);
    this.setState({
      highlight: true,
      greater
    });

    this.timeoutId = setTimeout(() => {
      console.log('timetime');
      this.setState({
        highlight: false
      });
    }, 2000);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.percentage !== this.props.percentage) {
      this.highlight(this.props.percentage > prevProps.percentage);
    }
  }

  render() {
    const {
      keyPair,
      last,
      volume,
      percentage,
      onTogglePin,
      pinned
    } = this.props;
    const { highlight, greater } = this.state;

    if (!keyPair) return null;

    //const key = keyPair.split('_')[1];
    const fullName = currency_name[keyPair];
    const parsedPercentage = Math.round(parseFloat(percentage) * 10000) / 100;
    const parsedVolume = Math.round(parseFloat(volume) * 100) / 100;
    let value = null;
    if (keyPair === 'BTC') value = last.toFixed(6);
    else value = last.toFixed(9);

    return (
      <div className={cx('rate-wrapper')}>
        <HoverCard
          className={cx(
            'rate-info-card',
            highlight && (greater ? 'green' : 'red')
          )}
          onClick={this.handleOpenCurrency}
        >
          <div className={cx('head')}>
            <div className={cx('short-name')}>{keyPair}</div>
            <div className={cx('pin-wrapper', { active: pinned })}>
              <TiPin
                onClick={(e) => {
                  e.stopPropagation();
                  onTogglePin();
                }}
              />
            </div>
          </div>
          <div
            className={cx('percentage', {
              positive: parsedPercentage > 0,
              neutral: parsedPercentage === 0
            })}
          >
            ({parsedPercentage.toFixed(2)}%)
          </div>
          {keyPair === 'BTC' ? (
            <div className={cx('value')}>{value}USD</div>
          ) : (
            <div className={cx('value')}>{value}BTC</div>
          )}
          <div className={cx('name')}>{fullName}</div>
          <div className={cx('volume')}>
            <b>볼륨</b>
            <span>{parsedVolume}</span>
          </div>
        </HoverCard>
      </div>
    );
  }
}

export default withRouter(RateInfoCard);
