import { PROFILE_FETCHED_FAIL, PROFILE_FETCHED_SUCCESS } from '../actions/profile/profileActionConstants';
import { createReducer } from './reducerUtils';
import {LOGIN_FAIL} from "../actions/auth/authActionConstants";
const initialState = {
  loggedIn: false,
  certificate: '',
  profile: {},
  error: {}
};

const profileSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    certificate: payload.auth.certificate,
    profile: payload.profile,
    loggedIn: true
  };
};

const profileFailReducer = (state = initialState, payload) => {
  console.log(payload);
  return {
    ...state,
    error: payload.error,
    loggedIn: false
  };
};

const loginFailReducer = (state = initialState, payload) => {
    console.log(state);
    return {
        ...state,
        error: payload.error,
        loggedIn: false
    };
};

export default createReducer(initialState, {
  [PROFILE_FETCHED_SUCCESS]: profileSuccessReducer,
  [PROFILE_FETCHED_FAIL]: profileFailReducer,
  [LOGIN_FAIL]: loginFailReducer,
});
