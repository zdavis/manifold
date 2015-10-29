import {handleActions} from 'redux-actions';
import merge from 'lodash/object/merge';

const initialState = {
  results: {},
  texts: {},
  textSections: {}
};

const fetch = {
  next(state, action) {
    const results = {};
    results[action.type] = {
      result: action.payload.result,
      receivedAt: Date.now()
    };
    return merge({results}, state, action.payload.entities);
  }
};

export default handleActions({
  FETCH_TEXTS: fetch,
  FETCH_ONE_TEXT: fetch
}, initialState);
