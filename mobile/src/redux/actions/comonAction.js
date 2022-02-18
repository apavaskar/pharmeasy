import {
  LOAD_BEATS_FAIL_ACTION,
  LOAD_BEATS_START_ACTION,
  LOAD_BEATS_SUCCESS_ACTION,
  LOAD_DOCTORS_FAIL_ACTION,
  LOAD_DOCTORS_START_ACTION,
  LOAD_DOCTORS_SUCCESS_ACTION,
  LOAD_EMPLOYEE_FAIL_ACTION,
  LOAD_EMPLOYEE_START_ACTION,
  LOAD_EMPLOYEE_SUCCESS_ACTION,
} from './actionConstants';
import {showErrorMessage, showSuccessMessage} from '../../widgets/showMessage';

export const loadEmployeeStartAction = payload => dispatch => {
  dispatch({
    type: LOAD_EMPLOYEE_START_ACTION,
    payload: payload,
  });
};

export const loadEmployeeSuccessAction = payload => dispatch => {
  dispatch({
    type: LOAD_EMPLOYEE_SUCCESS_ACTION,
    payload: payload,
  });
};

export const loadEmployeeFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to load employee profile',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: LOAD_EMPLOYEE_FAIL_ACTION,
    payload: payload,
  });
};

export const loadBeatsStartAction = payload => dispatch => {
  dispatch({
    type: LOAD_BEATS_START_ACTION,
    payload: payload,
  });
};

export const loadBeatsSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Patches loaded successfully',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: LOAD_BEATS_SUCCESS_ACTION,
    payload: payload,
  });
};

export const loadBeatsFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to load patch',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: LOAD_BEATS_FAIL_ACTION,
    payload: payload,
  });
};

export const loadDoctorsStartAction = payload => dispatch => {
  dispatch({
    type: LOAD_DOCTORS_START_ACTION,
    payload: payload,
  });
};

export const loadDoctorsSuccessAction = payload => dispatch => {
  dispatch({
    type: LOAD_DOCTORS_SUCCESS_ACTION,
    payload: payload,
  });
};

export const loadDoctorsFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to load patch',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: LOAD_DOCTORS_FAIL_ACTION,
    payload: payload,
  });
};
