import React from 'react';
import styles from './UserButton.scss';
import classNames from 'classnames/bind';
import { IoMdPerson } from 'react-icons/io';

const cx = classNames.bind(styles);

const UserButton = ({ displayName, onLogoutClick }) => {
  return (
    <div className={cx('user-button')}>
      <IoMdPerson />
      <div className={cx('displayName')}>{displayName}님</div>
      <ul className="user-menu">
        <li onClick={onLogoutClick}>로그아웃</li>
      </ul>
    </div>
  );
};

export default UserButton;
