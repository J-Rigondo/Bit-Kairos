import React from 'react';
import './Logo.scss';
import logo from '../../../static/images/logo.png';
const Logo = () => {
  return <img className="logo" src={logo} alt="logo" />;
};

export default Logo;
