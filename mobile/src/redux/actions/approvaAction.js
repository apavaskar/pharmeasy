import {
  APPROVE_PATIENT_RCPA_FAIL,
  APPROVE_PATIENT_RCPA_START,
  APPROVE_PATIENT_RCPA_SUCCESS,
  REFRESH_PATIENT_APPROVAL_FAIL,
  REFRESH_PATIENT_APPROVAL_START,
  REFRESH_PATIENT_APPROVAL_SUCCESS,
  REJECT_PATIENT_RCPA_FAIL,
  REJECT_PATIENT_RCPA_START,
  REJECT_PATIENT_RCPA_SUCCESS,
} from './actionConstants';
import {showErrorMessage, showSuccessMessage} from '../../widgets/showMessage';

export const initPatientApprovalListStartAction = payload => dispatch => {
  dispatch({
    type: REFRESH_PATIENT_APPROVAL_START,
    payload: payload,
  });
};

export const initPatientApprovalListSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Fetched the approval successfully',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: REFRESH_PATIENT_APPROVAL_SUCCESS,
    payload: payload,
  });
};

export const initPatientApprovalListFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to fetch the approval list',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: REFRESH_PATIENT_APPROVAL_FAIL,
    payload: payload,
  });
};

export const approvePatientRCPAStartAction = payload => dispatch => {
  dispatch({
    type: APPROVE_PATIENT_RCPA_START,
    payload: payload,
  });
};

export const approvePatientRCPASuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Approval successful',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: APPROVE_PATIENT_RCPA_SUCCESS,
    payload: payload,
  });
};

export const approvePatientRCPAFailAction = payload => dispatch => {
  showErrorMessage({
    message: `Failed to approve, ${payload.error}`,
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: APPROVE_PATIENT_RCPA_FAIL,
    payload: payload,
  });
};

export const rejectPatientRCPAStartAction = payload => dispatch => {
  dispatch({
    type: REJECT_PATIENT_RCPA_START,
    payload: payload,
  });
};

export const rejectPatientRCPASuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Reject successful',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: REJECT_PATIENT_RCPA_SUCCESS,
    payload: payload,
  });
};

export const rejectPatientRCPAFailAction = payload => dispatch => {
  showErrorMessage({
    message: `Failed to reject, ${payload.error}`,
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: REJECT_PATIENT_RCPA_FAIL,
    payload: payload,
  });
};
