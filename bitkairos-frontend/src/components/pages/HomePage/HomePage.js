import React from 'react';
import { PageTemplate } from 'components';
import { HeaderContainer, HomeContainer } from 'containers';

const HomePage = () => {
  return (
    <>
      <PageTemplate header={<HeaderContainer />}>
        <HomeContainer />
      </PageTemplate>
    </>
  );
};

export default HomePage;
