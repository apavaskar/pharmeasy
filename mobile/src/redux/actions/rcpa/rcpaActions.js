import {
  showErrorMessage,
  showSuccessMessage,
} from '../../../widgets/showMessage';
import {
  SINGLE_RCPA_CHANGE_FAIL, SINGLE_RCPA_CHANGE_START, SINGLE_RCPA_CHANGE_SUCCESS,
  SINGLE_RCPA_INIT_FAIL,
  SINGLE_RCPA_INIT_START,
  SINGLE_RCPA_INIT_SUCCESS,
} from './rcpaActionConstants';

export const singleRCPAInitStartAction = payload => dispatch => {
  dispatch({
    type: SINGLE_RCPA_INIT_START,
    payload: payload,
  });
};

export const singleRCPAInitSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Loaded RCPA data',
  });
  dispatch({
    type: SINGLE_RCPA_INIT_SUCCESS,
    payload: payload,
  });
};

export const singleRCPAInitFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to load RCPA data',
  });
  dispatch({
    type: SINGLE_RCPA_INIT_FAIL,
    payload: payload,
  });
};

export const singleRCPAChangeStartAction = payload => dispatch => {
  dispatch({
    type: SINGLE_RCPA_CHANGE_START,
    payload: payload,
  });
};

export const singleRCPAChangeSuccessAction = payload => dispatch => {
  dispatch({
    type: SINGLE_RCPA_CHANGE_SUCCESS,
    payload: payload,
  });
};

export const singleRCPAChangeFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to change the value',
  });
  dispatch({
    type: SINGLE_RCPA_CHANGE_FAIL,
    payload: payload,
  });
};
