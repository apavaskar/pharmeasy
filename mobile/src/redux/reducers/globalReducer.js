import {createReducer} from './reducerUtils';
import {
  HIDE_SPINNER,
  RESET_DATA,
  SHOW_SPINNER,
} from '../actions/actionConstants';
import {merge} from 'lodash';

const initialState = {
  showSpinner: false,
};

const showSpinner = (state = initialState) => {
  return merge({}, state, {showSpinner: true});
};

const hideSpinner = (state = initialState) => {
  return merge({}, state, {showSpinner: false});
};

const resetGlobalData = (state = initialState, payload) => {
  return initialState;
};

export default createReducer(initialState, {
  [SHOW_SPINNER]: showSpinner,
  [HIDE_SPINNER]: hideSpinner,
  [RESET_DATA]: resetGlobalData,
});
