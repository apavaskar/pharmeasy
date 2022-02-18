import {
  INIT_DIGITAL_CALL_FAIL,
  INIT_DIGITAL_CALL_START,
  INIT_DIGITAL_CALL_SUCCESS,
  SAVE_DIGITAL_CALL_FAIL,
  SAVE_DIGITAL_CALL_START,
  SAVE_DIGITAL_CALL_SUCCESS,
} from './digitalCallActionConstant';
import {
  showErrorMessage,
  showSuccessMessage,
} from '../../../widgets/showMessage';

export const initDigitalCallStartAction = payload => dispatch => {
  dispatch({
    type: INIT_DIGITAL_CALL_START,
    payload: payload,
  });
};

export const initDigitalCallSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Initialized the Digital calls',
  });
  dispatch({
    type: INIT_DIGITAL_CALL_SUCCESS,
    payload: payload,
  });
};

export const initDigitalCallFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to initialize',
  });
  dispatch({
    type: INIT_DIGITAL_CALL_FAIL,
    payload: payload,
  });
};

export const saveDigitalCallStartAction = payload => dispatch => {
  dispatch({
    type: SAVE_DIGITAL_CALL_START,
    payload: payload,
  });
};

export const saveDigitalCallSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Saved call details',
  });
  dispatch({
    type: SAVE_DIGITAL_CALL_SUCCESS,
    payload: payload,
  });
};

export const saveDigitalCallFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to save call',
  });
  dispatch({
    type: SAVE_DIGITAL_CALL_FAIL,
    payload: payload,
  });
};
