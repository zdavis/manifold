import {handleActions} from 'redux-actions';

const initialState = {
  response: null,
  status: null,
  statusText: null,
  exists: false
};

const handleAPIError = function(state, action) {
  return {
    response: action.payload,
    status: action.payload.status,
    statusText: action.payload.statusText,
    action: action.meta.action,
    exists: true
  };
};

const handleClearError = function() {
  return initialState;
};

export default handleActions({
  API_ERROR: handleAPIError,
  CLEAR_ERROR: handleClearError
}, initialState);
