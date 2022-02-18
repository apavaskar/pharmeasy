import {
  ADD_UNPLANNED_DOCTORS_FAIL,
  ADD_UNPLANNED_DOCTORS_START,
  ADD_UNPLANNED_DOCTORS_SUCCESS,
  ADD_UNPLANNED_NCA_FAIL,
  ADD_UNPLANNED_NCA_START,
  ADD_UNPLANNED_NCA_SUCCESS,
  CALL_INIT_DOCTOR_LIST_FAIL,
  CALL_INIT_DOCTOR_LIST_START,
  CALL_INIT_DOCTOR_LIST_SUCCESS,
  CALL_INIT_NCA_LIST_FAIL,
  CALL_INIT_NCA_LIST_START,
  CALL_INIT_NCA_LIST_SUCCESS,
  CALL_SET_CALL_TYPE_LIST_FAIL,
  CALL_SET_CALL_TYPE_LIST_START,
  CALL_SET_CALL_TYPE_LIST_SUCCESS,
  ZSM_CALL_CONFIRM_FAIL,
  ZSM_CALL_CONFIRM_START,
  ZSM_CALL_CONFIRM_SUCCESS,
} from './callReportingActionConstants';
import {
  showErrorMessage,
  showSuccessMessage,
} from '../../../widgets/showMessage';

export const callTypeListToReportStartAction = payload => dispatch => {
  dispatch({
    type: CALL_SET_CALL_TYPE_LIST_START,
    payload: payload,
  });
};

export const callTypeListToReportSuccessAction = payload => dispatch => {
  dispatch({
    type: CALL_SET_CALL_TYPE_LIST_SUCCESS,
    payload: payload,
  });
};

export const callTypeListToReportFailAction = payload => dispatch => {
  dispatch({
    type: CALL_SET_CALL_TYPE_LIST_FAIL,
    payload: payload,
  });
};

export const callInitDoctorListStartAction = payload => dispatch => {
  dispatch({
    type: CALL_INIT_DOCTOR_LIST_START,
    payload: payload,
  });
};

export const callInitDoctorListSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Loaded Doctors to report',
  });
  dispatch({
    type: CALL_INIT_DOCTOR_LIST_SUCCESS,
    payload: payload,
  });
};

export const callInitDoctorListFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to load doctors to report',
  });
  dispatch({
    type: CALL_INIT_DOCTOR_LIST_FAIL,
    payload: payload,
  });
};

export const callInitNCAListStartAction = payload => dispatch => {
  dispatch({
    type: CALL_INIT_NCA_LIST_START,
    payload: payload,
  });
};

export const callInitNCAListSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Loaded Noncall activities to report',
  });
  dispatch({
    type: CALL_INIT_NCA_LIST_SUCCESS,
    payload: payload,
  });
};

export const callInitNCAListFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to load Noncall activities to report',
  });
  dispatch({
    type: CALL_INIT_NCA_LIST_FAIL,
    payload: payload,
  });
};

export const addUnplannedDoctorStartAction = payload => dispatch => {
  dispatch({
    type: ADD_UNPLANNED_DOCTORS_START,
    payload: payload,
  });
};

export const addUnplannedDoctorSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Added doctor(s) to the planned successfully',
  });
  dispatch({
    type: ADD_UNPLANNED_DOCTORS_SUCCESS,
    payload: payload,
  });
};

export const addUnplannedDoctorFailAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Failed to add doctor(s)',
  });
  dispatch({
    type: ADD_UNPLANNED_DOCTORS_FAIL,
    payload: payload,
  });
};

export const addUnplannedNCAStartAction = payload => dispatch => {
  dispatch({
    type: ADD_UNPLANNED_NCA_START,
    payload: payload,
  });
};

export const addUnplannedNCASuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Added the NonCall activities',
  });
  dispatch({
    type: ADD_UNPLANNED_NCA_SUCCESS,
    payload: payload,
  });
};

export const addUnplannedNCAFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to add NonCall activities',
  });
  dispatch({
    type: ADD_UNPLANNED_NCA_FAIL,
    payload: payload,
  });
};

export const zsmCallConfirmStartAction = payload => dispatch => {
  dispatch({
    type: ZSM_CALL_CONFIRM_START,
    payload: payload,
  });
};

export const zsmCallConfirmSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Call confirmed',
  });
  dispatch({
    type: ZSM_CALL_CONFIRM_SUCCESS,
    payload: payload,
  });
};

export const zsmCallConfirmFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to confirm call',
  });
  dispatch({
    type: ZSM_CALL_CONFIRM_FAIL,
    payload: payload,
  });
};
