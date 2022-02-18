import {
  INIT_LEAVE_FAIL,
  INIT_LEAVE_START,
  INIT_LEAVE_SUCCESS,
  LEAVE_APPLY_FAIL,
  LEAVE_APPLY_START,
  LEAVE_APPLY_SUCCESS,
} from './actionConstants';
import {showErrorMessage, showSuccessMessage} from '../../widgets/showMessage';

export const initLeaveStartAction = payload => dispatch => {
  dispatch({
    type: INIT_LEAVE_START,
    payload: payload,
  });
};

export const initLeaveSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Leaves initialized successfully',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: INIT_LEAVE_SUCCESS,
    payload: payload,
  });
};

export const initLeaveFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to init leaves',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: INIT_LEAVE_FAIL,
    payload: payload,
  });
};

export const applyLeaveStartAction = payload => dispatch => {
  dispatch({
    type: LEAVE_APPLY_START,
    payload: payload,
  });
};

export const applyLeaveSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Leave Applied Successfully',
  });
  dispatch({
    type: LEAVE_APPLY_SUCCESS,
    payload: payload,
  });
};

export const applyLeaveFailAction = payload => dispatch => {
  showErrorMessage({
    message: `Failed to apply leave, please try again, ${payload.error.message}`,
  });
  dispatch({
    type: LEAVE_APPLY_FAIL,
    payload: payload,
  });
};
