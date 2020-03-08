import React from 'react';
import './Logo.scss';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Logo = () => {
  return (
    <>
      <div className="header-icon">
        <FontAwesomeIcon icon={faBitcoin} />
      </div>
      <div className="header-logo">BIT - KARIOS</div>
    </>
  );
};

export default Logo;
