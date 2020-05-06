import React from 'react';
import {
  PageTemplate,
  TradeIndexSubPage,
  TradeDetailSubPage
} from 'components';
import { HeaderContainer } from 'containers';
import { Route } from 'react-router-dom';

const TradePage = ({ match }) => {
  console.log(match);
  return (
    <PageTemplate header={<HeaderContainer />}>
      <Route
        path={`${match.url}/:currencyKey`}
        component={TradeDetailSubPage}
      />
      <Route exact path={match.url} component={TradeIndexSubPage} />
    </PageTemplate>
  );
};

export default TradePage;
