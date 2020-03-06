import React, { Component } from 'react';
import HomePage from './pages/HomePage';
import TradePage from './pages/TradePage';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <>
        <Route exact path="/" component={HomePage} />
        <Route path="/trade" component={TradePage} />
      </>
    );
  }
}

export default App;
