import {createReducer} from './reducerUtils';
import {
  AUTHENTICATION_FAIL_ACTION,
  AUTHENTICATION_SUCCESS_ACTION,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  RUN_DB_INSTALL_FAIL,
  RUN_DB_INSTALL_SUCCESS,
} from '../actions/actionConstants';

const initialState = {
  loggedIn: false,
  authDone: false,
  certificate: '',
  error: {},
};

const dbInstallSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    employee: payload.employee,
    authDone: payload.certificate !== '' && payload.certificate !== null,
    loggedIn: payload.certificate !== '' && payload.certificate !== null,
    certificate: payload.certificate,
  };
};

const dbInstallFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    loggedIn: false,
    authDone: true,
    error: payload.error,
  };
};

const authSuccessReducer = (state = initialState, payload) => {
  console.log(payload);
  return {
    ...state,
    loggedIn: true,
    authDone: true,
    certificate: payload.payload,
  };
};

const authFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    loggedIn: false,
    authDone: true,
    error: payload.error,
  };
};

const logoutSuccessReducer = (state = initialState, payload) => {
  return initialState;
};

const logoutFailReducer = (state = initialState, payload) => {
  return {
    ...state,
  };
};

export default createReducer(initialState, {
  [RUN_DB_INSTALL_SUCCESS]: dbInstallSuccessReducer,
  [RUN_DB_INSTALL_FAIL]: dbInstallFailReducer,
  [AUTHENTICATION_SUCCESS_ACTION]: authSuccessReducer,
  [AUTHENTICATION_FAIL_ACTION]: authFailReducer,
  [LOGOUT_SUCCESS]: logoutSuccessReducer,
  [LOGOUT_FAIL]: logoutFailReducer,
});
