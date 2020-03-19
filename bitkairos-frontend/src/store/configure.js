import { createStore, applyMiddleware, compose } from 'redux';
import penderMiddleware from 'redux-pender';
import modules from './modules';

const isDev = process.env.NODE_ENV === 'development';

const devTools =
  isDev && window.devToolsExtension
    ? window.devToolsExtension
    : () => (fn) => fn;

const configureStore = (initialState) => {
  const enhancers = [applyMiddleware(penderMiddleware()), devTools()];
  const store = createStore(modules, initialState, compose(...enhancers));

  return store;
};

export default configureStore;
