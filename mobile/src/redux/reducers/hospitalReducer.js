import {createReducer} from './reducerUtils';
import {
  DELETE_HOSPITAL_ENTRY_FAIL,
  DELETE_HOSPITAL_ENTRY_SUCCESS,
  INIT_HOSPITAL_DAILY_ENTRY_FAIL,
  INIT_HOSPITAL_DAILY_ENTRY_SUCCESS,
  INIT_HOSPITAL_ENTRY_FAIL,
  INIT_HOSPITAL_ENTRY_SUCCESS,
  INIT_HOSPITAL_LIST_FAIL,
  INIT_HOSPITAL_LIST_SUCCESS,
  SAVE_HOSPITAL_DAILY_ENTRY_FAIL,
  SAVE_HOSPITAL_DAILY_ENTRY_SUCCESS,
} from '../actions/actionConstants';

const initialState = {
  entries: [],
  hospitals: [],
  dailyEntry: {},
  doctors: [],
  approvals: [],
  error: {},
};

const initHospitalListSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    hospitals: payload.hospitals,
  };
};

const initHospitalListFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const initHospitalEntrySuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    entries: payload.entries,
  };
};

const initHospitalEntryFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const initHospitalDailyEntrySuccessReducer = (
  state = initialState,
  payload,
) => {
  return {
    ...state,
    dailyEntry: payload.entry,
    doctors: payload.doctors,
  };
};

const initHospitalDailyEntryFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

export default createReducer(initialState, {
  [INIT_HOSPITAL_LIST_SUCCESS]: initHospitalListSuccessReducer,
  [INIT_HOSPITAL_LIST_FAIL]: initHospitalListFailReducer,
  [INIT_HOSPITAL_ENTRY_SUCCESS]: initHospitalEntrySuccessReducer,
  [INIT_HOSPITAL_ENTRY_FAIL]: initHospitalEntryFailReducer,
  [DELETE_HOSPITAL_ENTRY_SUCCESS]: initHospitalEntrySuccessReducer,
  [DELETE_HOSPITAL_ENTRY_FAIL]: initHospitalEntryFailReducer,
  [INIT_HOSPITAL_DAILY_ENTRY_SUCCESS]: initHospitalDailyEntrySuccessReducer,
  [INIT_HOSPITAL_DAILY_ENTRY_FAIL]: initHospitalDailyEntryFailReducer,
  [SAVE_HOSPITAL_DAILY_ENTRY_SUCCESS]: initHospitalDailyEntrySuccessReducer,
  [SAVE_HOSPITAL_DAILY_ENTRY_FAIL]: initHospitalDailyEntryFailReducer,
});
