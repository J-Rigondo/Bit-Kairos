import React from 'react';
import './Header.scss';
import Logo from '../../atoms/Logo';

const Header = () => {
  return (
    <div className="header">
      <div className="logo-wrapper">
        <Logo />
      </div>
    </div>
  );
};

export default Header;
