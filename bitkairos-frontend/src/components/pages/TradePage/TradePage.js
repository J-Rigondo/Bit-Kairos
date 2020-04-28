import React from 'react';
import { PageTemplate, TradeIndexSubPage } from 'components';
import { HeaderContainer } from 'containers';
import { Route } from 'react-router-dom';

const TradePage = ({ match }) => {
  console.log(match);
  return (
    <PageTemplate header={<HeaderContainer />}>
      <Route exact path="/trade" component={TradeIndexSubPage} />
    </PageTemplate>
  );
};

export default TradePage;
