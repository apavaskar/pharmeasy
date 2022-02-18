import {createReducer} from '../reducerUtils';
import {
  ADD_UNPLANNED_DOCTORS_FAIL,
  ADD_UNPLANNED_DOCTORS_SUCCESS,
  ADD_UNPLANNED_NCA_FAIL,
  ADD_UNPLANNED_NCA_SUCCESS,
  CALL_INIT_DOCTOR_LIST_FAIL,
  CALL_INIT_DOCTOR_LIST_SUCCESS,
  CALL_INIT_NCA_LIST_FAIL,
  CALL_INIT_NCA_LIST_SUCCESS,
  CALL_SET_CALL_TYPE_LIST_FAIL,
  CALL_SET_CALL_TYPE_LIST_SUCCESS,
  ZSM_CALL_CONFIRM_FAIL,
  ZSM_CALL_CONFIRM_SUCCESS,
} from '../../actions/callReporting/callReportingActionConstants';
import {toYyyyMmDd} from '../../../utils/dateUtil';

const initialState = {
  reportingDate: new Date(),
  currentAction: 0,
  doctorList: [],
  nonCallActivityList: [],
  refreshList: new Date().getTime(),
};
const setCallTypeListSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    reportingDate: payload.reportingDate,
    currentAction: payload.currentAction,
    doctorList: [],
    nonCallActivityList: [],
  };
};

const setCallTypeListFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
    doctorList: [],
    nonCallActivityList: [],
  };
};

const initDoctorListSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    doctorList: payload.doctorList,
    refreshList: new Date().getTime(),
  };
};

const initDoctorListFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
    doctorList: [],
  };
};

const addUnplannedDoctorsToPlanSuccessReducer = (
  state = initialState,
  payload,
) => {
  return {
    ...state,
    doctorList: payload.doctorList,
  };
};

const addUnplannedDoctorsToPlanFailReducer = (
  state = initialState,
  payload,
) => {
  return {
    ...state,
    error: payload.error,
  };
};

const initNCACallListSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    doctorList: [],
    nonCallActivityList: payload.nonCallActivityList,
    refreshList: new Date().getTime(),
  };
};

const initNCACallListFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    doctorList: [],
    nonCallActivityList: [],
    error: payload.error,
  };
};

const addUnplannedNCASuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    doctorList: [],
    nonCallActivityList: payload.activities,
  };
};

const addUnplannedNCAFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    doctorList: [],
    nonCallActivityList: [],
    error: payload.error,
  };
};

export default createReducer(initialState, {
  [CALL_SET_CALL_TYPE_LIST_SUCCESS]: setCallTypeListSuccessReducer,
  [CALL_SET_CALL_TYPE_LIST_FAIL]: setCallTypeListFailReducer,

  [CALL_INIT_DOCTOR_LIST_SUCCESS]: initDoctorListSuccessReducer,
  [CALL_INIT_DOCTOR_LIST_FAIL]: initDoctorListFailReducer,

  [ADD_UNPLANNED_DOCTORS_SUCCESS]: addUnplannedDoctorsToPlanSuccessReducer,
  [ADD_UNPLANNED_DOCTORS_FAIL]: addUnplannedDoctorsToPlanFailReducer,

  [CALL_INIT_NCA_LIST_SUCCESS]: initNCACallListSuccessReducer,
  [CALL_INIT_NCA_LIST_FAIL]: initNCACallListFailReducer,

  [ADD_UNPLANNED_NCA_SUCCESS]: addUnplannedNCASuccessReducer,
  [ADD_UNPLANNED_NCA_FAIL]: addUnplannedNCAFailReducer,

  [ZSM_CALL_CONFIRM_SUCCESS]: initDoctorListSuccessReducer,
  [ZSM_CALL_CONFIRM_FAIL]: initDoctorListFailReducer,
});
