import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {devTools} from 'redux-devtools';
import {connect} from 'react-redux';
import reducer from './reducers/index';
import createHistory from 'history/lib/createBrowserHistory';
import { reduxReactRouter } from 'redux-router';
import createLogger from 'redux-logger';
import Root from 'components/Root';
import promiseMiddleware from 'redux-promise';
import errorMiddleware from 'middlewares/error';

connect(state => ({ routerState: state.router }));

require('manifold-skin/styles/styles.scss');

const loggerMiddleware = createLogger();

const store = compose(
  applyMiddleware(
    loggerMiddleware,
    promiseMiddleware,
    errorMiddleware
  ),
  reduxReactRouter({
    createHistory
  }),
  devTools()
)(createStore)(reducer);

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

