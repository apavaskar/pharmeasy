import {
  AUTHENTICATION_FAIL_ACTION,
  AUTHENTICATION_START_ACTION,
  AUTHENTICATION_SUCCESS_ACTION,
  LOGOUT_FAIL,
  LOGOUT_START,
  LOGOUT_SUCCESS,
} from './actionConstants';
import {showErrorMessage, showSuccessMessage} from '../../widgets/showMessage';

export const authStartAction = payload => dispatch => {
  dispatch({
    type: AUTHENTICATION_START_ACTION,
    payload: payload,
  });
};

export const authSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'You have been authenticated',
  });
  dispatch({
    type: AUTHENTICATION_SUCCESS_ACTION,
    payload: payload,
  });
};

export const authFailAction = payload => dispatch => {
  showErrorMessage({
    message: `Authentication has failed, ${payload.error.message}`,
  });
  dispatch({
    type: AUTHENTICATION_FAIL_ACTION,
    payload: payload,
  });
};

export const logoutStartAction = payload => dispatch => {
  dispatch({
    type: LOGOUT_START,
    payload: payload,
  });
};

export const logoutSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Successfully logged out',
  });
  dispatch({
    type: LOGOUT_SUCCESS,
    payload: payload,
  });
};

export const logoutFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to logout',
  });
  dispatch({
    type: LOGOUT_FAIL,
    payload: payload,
  });
};
