import React from 'react';
import { PageTemplate, Background } from 'components';
import { HeaderContainer } from 'containers';

const HomePage = () => {
  return (
    <>
      <PageTemplate header={<HeaderContainer />}></PageTemplate>
      <Background />
    </>
  );
};

export default HomePage;
