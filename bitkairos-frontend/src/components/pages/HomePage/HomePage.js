import React from 'react';
import { PageTemplate, Background } from 'components';
import { HeaderContainer } from 'containers';

const HomePage = () => {
  return (
    <>
      <PageTemplate header={<HeaderContainer />}>
        <Background main />
      </PageTemplate>
    </>
  );
};

export default HomePage;
