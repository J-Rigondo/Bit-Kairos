import React from 'react';
import './PageTemplate.scss';

const PageTemplate = ({ header, children, responsive }) => {
  return (
    <div className="page">
      <header>{header}</header>
      <div className={'content responsive ' + (header ? 'has-header' : '')}>
        {children}
      </div>
    </div>
  );
};

export default PageTemplate;
