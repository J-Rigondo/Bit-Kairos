import React, { Component } from 'react';
import styles from './Paper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Paper extends Component {
  render() {
    const { children } = this.props;

    return <div className={cx('paper')}>{children}</div>;
  }
}

export default Paper;
