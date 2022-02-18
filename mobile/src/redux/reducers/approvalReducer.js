import {createReducer} from './reducerUtils';
import {
  APPROVE_PATIENT_RCPA_FAIL,
  APPROVE_PATIENT_RCPA_SUCCESS,
  REFRESH_PATIENT_APPROVAL_FAIL,
  REFRESH_PATIENT_APPROVAL_SUCCESS,
} from '../actions/actionConstants';

const initialState = {
  patientApprovals: [],
  error: {},
};

const refreshPatientApprovalSuccessReducer = (
  state = initialState,
  payload,
) => {
  return {
    ...state,
    patientApprovals: payload.approvals,
  };
};

const refreshPatientApprovalFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

export default createReducer(initialState, {
  [REFRESH_PATIENT_APPROVAL_SUCCESS]: refreshPatientApprovalSuccessReducer,
  [REFRESH_PATIENT_APPROVAL_FAIL]: refreshPatientApprovalFailReducer,
  [APPROVE_PATIENT_RCPA_SUCCESS]: refreshPatientApprovalSuccessReducer,
  [APPROVE_PATIENT_RCPA_FAIL]: refreshPatientApprovalFailReducer,
});
