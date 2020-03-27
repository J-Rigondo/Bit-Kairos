import React from 'react';
import './Logo.scss';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/">
      <div className="header-icon">
        <FontAwesomeIcon icon={faBitcoin} />
      </div>
      <div className="header-logo">BIT - KARIOS</div>
    </Link>
  );
};

export default Logo;
