import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import combineReducers from './store';
import Routes from './routes';

export default function App() {
  return (
    <Provider
      store={createStore(combineReducers, {}, applyMiddleware(ReduxThunk))}>
      <Routes />
    </Provider>
  );
}
