import {createReducer} from '../reducerUtils';
import {
  INIT_DOCTOR_ADD_FAIL,
  INIT_DOCTOR_ADD_SUCCESS,
  INIT_DOCTOR_LIST_FAIL,
  INIT_DOCTOR_LIST_SUCCESS,
  SAVE_DOCTOR_FAIL,
  SAVE_DOCTOR_SUCCESS,
} from '../../actions/doctorChemist/doctorListActionConstant';

const initialState = {
  doctorList: [],
  specialities: [],
  doctor: {},
  beats: [],
  saved: false,
  error: {},
};

const doctorListSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    doctorList: payload.doctors,
  };
};

const doctorListFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const initDoctorAddSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    specialities: payload.specialities,
    beats: payload.beats,
  };
};

const initDoctorAddFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const saveDoctorSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    doctor: payload.doctor,
    saved: true,
  };
};

const saveDoctorFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

export default createReducer(initialState, {
  [INIT_DOCTOR_LIST_SUCCESS]: doctorListSuccessReducer,
  [INIT_DOCTOR_LIST_FAIL]: doctorListFailReducer,
  [INIT_DOCTOR_ADD_SUCCESS]: initDoctorAddSuccessReducer,
  [INIT_DOCTOR_ADD_FAIL]: initDoctorAddFailReducer,
  [SAVE_DOCTOR_SUCCESS]: saveDoctorSuccessReducer,
  [SAVE_DOCTOR_FAIL]: saveDoctorFailReducer,
});
