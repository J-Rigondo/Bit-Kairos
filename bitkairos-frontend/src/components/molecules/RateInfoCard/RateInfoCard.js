import React from 'react';
import styles from './RateInfoCard.scss';
import classNames from 'classnames/bind';
import { HoverCard } from 'components';
import { TiPin } from 'react-icons/ti';
import { currency_name } from 'lib/variables';
const cx = classNames.bind(styles);

const RateInfoCard = ({
  keyPair = 'BTC',
  name = 'Bitcoin',
  last = '123123',
  volume = '123123',
  percentage = '0.01',
  onTogglePin,
  pinned
}) => {
  const key = keyPair.split('_')[1];
  const fullName = currency_name[key];
  const parsedPercentage = Math.round(parseFloat(percentage) * 10000) / 100;
  const parsedVolume = Math.round(parseFloat(volume) * 100) / 100;
  const value = last.toFixed(9);

  return (
    <div className={cx('rate-wrapper')}>
      <HoverCard className={cx('rate-info-card')}>
        <div className={cx('head')}>
          <div className={cx('short-name')}>{key}</div>
          <div className={cx('pin-wrapper', { active: pinned })}>
            <TiPin onClick={onTogglePin} />
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
        <div className={cx('value')}>{value}BTC</div>
        <div className={cx('name')}>{fullName}</div>
        <div className={cx('volume')}>
          <b>볼륨</b>
          <span>{parsedVolume}</span>
        </div>
      </HoverCard>
    </div>
  );
};

export default RateInfoCard;
