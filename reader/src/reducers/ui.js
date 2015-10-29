import {handleActions} from 'redux-actions';

const initialState = {
  textNavOpen: false
};

const toggleTextNav = (state, action) => {
  const navOpenState = !state.textNavOpen;
  return Object.assign({}, state, {textNavOpen: navOpenState});
};


export default handleActions({
  TOGGLE_TEXT_NAV: toggleTextNav
}, initialState);
