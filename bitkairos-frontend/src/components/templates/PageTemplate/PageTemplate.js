import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PageTemplate = ({ header, children, responsive }) => {
  return (
    <div className="page">
      <header>{header}</header>
      <div
        className={cx('content has-header', {
          responsive
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default PageTemplate;
