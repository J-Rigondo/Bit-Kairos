import React from 'react';
import styles from './Background.scss';
import classNames from 'classnames/bind';
import { FaCodepen } from 'react-icons/fa';
import { Button } from 'components';

const cx = classNames.bind(styles);

const Background = ({ user, main, register, onLoginButtonClick }) => {
  return (
    <>
      {main && (
        <>
          <div className={cx('background-main blur')}>
            <div className={cx('text-area')}>
              <FaCodepen id="main-logo" className={cx('main-logo')} />
              <h1>Awesome coin trade simulation</h1>
              <h3>
                실제와 같은 시스템으로 빠르고 편리한 거래 환경을 제공합니다.
              </h3>

              {user ? (
                <div className={cx('welcome')}>환영합니다</div>
              ) : (
                <Button
                  className={cx('main-start')}
                  onClick={onLoginButtonClick}
                >
                  시작하기
                </Button>
              )}
            </div>
          </div>
        </>
      )}

      {register && <div className={cx('register-background')} />}
    </>
  );
};

export default Background;
