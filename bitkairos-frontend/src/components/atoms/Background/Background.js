import React from 'react';
import styles from './Background.scss';
import classNames from 'classnames/bind';
import { FaCodepen } from 'react-icons/fa';
import { Button } from 'components';

const cx = classNames.bind(styles);

const Background = ({ main, register }) => {
  return (
    <>
      {main && (
        <>
          <div className={cx('background-main blur')}>
            <div className={cx('text-area')}>
              <FaCodepen className={cx('main-logo')} />
              <h1>Awesome coin trade simulation</h1>
              <h3>
                실제와 같은 시스템으로 빠르고 편리한 거래 환경을 제공합니다.
              </h3>
              <Button className={cx('main-start')}>시작하기</Button>
            </div>
          </div>
        </>
      )}

      {register && <div className={cx('register-background')} />}
    </>
  );
};

export default Background;
