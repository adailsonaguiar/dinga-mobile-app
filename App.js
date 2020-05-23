import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import combineReducers from './src/store';
import Routes from './src/routes';

export default () => {
  return (
    <Provider
      store={createStore(combineReducers, {}, applyMiddleware(ReduxThunk))}>
      <Routes />
    </Provider>
  );
};
