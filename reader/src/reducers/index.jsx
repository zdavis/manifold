import {combineReducers} from 'redux';
import entities from 'reducers/entities';
import error from 'reducers/error';
import curtain from 'reducers/curtain';
import ui from 'reducers/ui';
import {routerStateReducer as router} from 'redux-router';

const reducers = combineReducers({entities, error, curtain, ui, router});
export default reducers;
