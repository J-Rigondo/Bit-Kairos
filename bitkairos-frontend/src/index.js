import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import Root from './components/Root';
import * as serviceWorker from './serviceWorker';
import configureStore from 'store/configure';
import socket from 'lib/socket';

const socketURI =
  process.env.NODE_ENV === 'production'
    ? (window.location.protocol === 'https//' ? 'wss://' : 'ws://') +
      window.location.host +
      '/ws'
    : 'ws://localhost:4000/ws';

const store = configureStore();

socket.initialize(store, socketURI);

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
