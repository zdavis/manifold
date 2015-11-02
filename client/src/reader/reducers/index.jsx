import {combineReducers} from 'redux';
import entities from 'reader/reducers/entities';
import error from 'reader/reducers/error';
import curtain from 'reader/reducers/curtain';
import ui from 'reader/reducers/ui';
import {routerStateReducer as router} from 'redux-router';

const reducers = combineReducers({entities, error, curtain, ui, router});
export default reducers;
