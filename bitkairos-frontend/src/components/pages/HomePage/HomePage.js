import React from 'react';
import { PageTemplate, Ticker, MarketWidget } from 'components';
import { HeaderContainer, HomeContainer } from 'containers';

const HomePage = () => {
  return (
    <>
      <PageTemplate header={<HeaderContainer />}>
        <HomeContainer />
        <Ticker />
        <MarketWidget />
      </PageTemplate>
    </>
  );
};

export default HomePage;
