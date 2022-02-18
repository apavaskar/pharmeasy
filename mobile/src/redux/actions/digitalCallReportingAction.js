import {
  LOAD_DIGITAL_TEMPLATE_FAIL,
  LOAD_DIGITAL_TEMPLATE_START,
  LOAD_DIGITAL_TEMPLATE_SUCCESS,
  SAVE_VIDEO_CALL_FAIL,
  SAVE_VIDEO_CALL_START,
  SAVE_VIDEO_CALL_SUCCESS,
} from './actionConstants';
import {showErrorMessage, showSuccessMessage} from '../../widgets/showMessage';

export const loadDigitalTemplatesStartAction = payload => dispatch => {
  dispatch({
    type: LOAD_DIGITAL_TEMPLATE_START,
    payload: payload,
  });
};

export const loadDigitalTemplatesSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Loaded Templates successfully',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: LOAD_DIGITAL_TEMPLATE_SUCCESS,
    payload: payload,
  });
};

export const loadDigitalTemplatesFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to load templates',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: LOAD_DIGITAL_TEMPLATE_FAIL,
    payload: payload,
  });
};

export const saveVideoCallStartAction = payload => dispatch => {
  dispatch({
    type: SAVE_VIDEO_CALL_START,
    payload: payload,
  });
};

export const saveVideoCallSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Visit Saved successfully',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: SAVE_VIDEO_CALL_SUCCESS,
    payload: payload,
  });
};

export const saveVideoCallFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Visit Save failed',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: SAVE_VIDEO_CALL_FAIL,
    payload: payload,
  });
};
