import React from 'react';
import { PageTemplate, Header, Background } from 'components';

const HomePage = () => {
  return (
    <>
      <PageTemplate header={<Header />}></PageTemplate>
      <Background />
    </>
  );
};

export default HomePage;
