import {createReducer} from './reducerUtils';
import {
  LOAD_BEATS_FAIL_ACTION,
  LOAD_BEATS_SUCCESS_ACTION,
  LOAD_DOCTORS_FAIL_ACTION,
  LOAD_DOCTORS_SUCCESS_ACTION,
  LOAD_EMPLOYEE_FAIL_ACTION,
  LOAD_EMPLOYEE_SUCCESS_ACTION,
} from '../actions/actionConstants';
import {
  loadBeatsSuccessAction,
  loadDoctorsFailAction,
} from '../actions/comonAction';

const initialState = {
  employee: {locationId: ''},
  beats: [],
  error: {},
};

export const loadEmployeeSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    employee: payload.employee,
  };
};

export const loadEmployeeFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    employee: {},
    error: payload.error,
  };
};

export const loadBeatsFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    beats: [],
    error: payload.error,
  };
};

export const loadBeatsSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    beats: payload.beats,
    error: payload.error,
  };
};

export const loadDoctorsFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    doctors: [],
    error: payload.error,
  };
};

export const loadDoctorsSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    doctors: payload.doctors,
    error: payload.error,
  };
};

export default createReducer(initialState, {
  [LOAD_EMPLOYEE_SUCCESS_ACTION]: loadEmployeeSuccessReducer,
  [LOAD_EMPLOYEE_FAIL_ACTION]: loadEmployeeFailReducer,
  [LOAD_BEATS_SUCCESS_ACTION]: loadBeatsSuccessReducer,
  [LOAD_BEATS_FAIL_ACTION]: loadBeatsFailReducer,
  [LOAD_DOCTORS_SUCCESS_ACTION]: loadDoctorsSuccessReducer,
  [LOAD_DOCTORS_FAIL_ACTION]: loadDoctorsFailAction,
});
