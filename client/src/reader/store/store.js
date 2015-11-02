import 'babel-core/polyfill';
import {createStore, applyMiddleware, compose} from 'redux';
import {devTools} from 'redux-devtools';
import {connect} from 'react-redux';
import reducer from 'reader/reducers/index';
import createHistory from 'history/lib/createBrowserHistory';
import { reduxReactRouter } from 'redux-router';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import errorMiddleware from 'reader/middlewares/error';

connect(state => ({ routerState: state.router }));

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

export default store;

