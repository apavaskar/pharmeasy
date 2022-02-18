import {createReducer} from '../reducerUtils';
import {
  CHANGE_CALL_STEP,
  INIT_VISIT_COMMENTS_FAIL,
  INIT_VISIT_COMMENTS_SUCCESS,
  INIT_VISIT_DETAILS_FAIL,
  INIT_VISIT_DETAILS_SUCCESS,
  RESET_CALL_SUCCESS,
  SAVE_DOCTOR_COORDINATES_FAIL,
  SAVE_DOCTOR_COORDINATES_SUCCESS,
  SAVE_VISIT_TO_DB_END,
  SAVE_VISIT_TO_DB_SUCCESS,
  SET_JOINEES,
} from '../../actions/callReporting/callReportingActionConstants';
import {
  HANDLE_PHYSICAL_DIGITAL_SWITCH_FAIL,
  HANDLE_PHYSICAL_DIGITAL_SWITCH_SUCCESS,
} from '../../actions/actionConstants';

const initialState = {
  reportingDate: new Date(),
  visitId: '',
  doctorProfile: {},
  currentReportingIndex: 0,
  physicalReportingStep: 0,
  joinees: [],
  allJoinees: [],
  allChemists: [],
  isPhysical: true,
  activityIndex: 0,
  remarks: '',
  initedVisitPage: false,
  doctorCoordinates: [],
  visit: {},
  locationTagError: false,
  saveCurrentCoordinates: false,
  stages: [],
  savedStages: [],
  error: {},
};

const initVisitSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    allJoinees: payload.allJoinees,
    allChemists: payload.allChemists,
    doctorProfile: payload.doctorProfile,
    visitId: payload.visitId,
    initedVisitPage: true,
    visit: payload.visit,
    error: {},
    locationTagError: false,
    doctorCoordinates: payload.coordinates,
    saveCurrentCoordinates: payload.saveCurrentCoordinates,
  };
};

const initVisitFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
    locationTagError: payload.locationTagError || false,
  };
};

const changeCallStepReducer = (state = initialState, payload) => {
  return {
    ...state,
    physicalReportingStep: payload.reportingStep,
  };
};

const setJoineesSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    joinees: payload.joinees,
  };
};

const handlePhysicalDigitalSwitchSuccessReducer = (
  state = initialState,
  payload,
) => {
  return {
    ...state,
    isPhysical: payload.isPhysical,
    allBrands: payload.allBrands,
  };
};

const handlePhysicalDigitalSwitchFailReducer = (
  state = initialState,
  payload,
) => {
  return {
    ...state,
    error: payload.error,
  };
};

const saveVisitDataSuccessReducer = (state = initialState, payload) => {
  return {
    ...initialState,
  };
};

const saveVisitDataFailReducer = (state = initialState, payload) => {
  return {
    ...state,
  };
};

const saveDoctorCoordinatesSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    doctorCoordinates: payload.coordinates,
  };
};

const saveDoctorCoordinatesFailReducer = (state = initialState, payload) => {
  return {
    ...state,
  };
};

const initVisitCommentsSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    stages: payload.stages,
    savedStages: payload.savedStages,
  };
};

const initVisitCommentsFailReducer = (state = initialState, payload) => {
  return {
    ...state,
  };
};

const resetCallSuccessReducer = (state = initialState, payload) => {
  return initialState;
};

export default createReducer(initialState, {
  [INIT_VISIT_DETAILS_SUCCESS]: initVisitSuccessReducer,
  [INIT_VISIT_DETAILS_FAIL]: initVisitFailReducer,
  [CHANGE_CALL_STEP]: changeCallStepReducer,
  [SET_JOINEES]: setJoineesSuccessReducer,
  [HANDLE_PHYSICAL_DIGITAL_SWITCH_SUCCESS]:
    handlePhysicalDigitalSwitchSuccessReducer,
  [HANDLE_PHYSICAL_DIGITAL_SWITCH_FAIL]: handlePhysicalDigitalSwitchFailReducer,
  [SAVE_VISIT_TO_DB_SUCCESS]: saveVisitDataSuccessReducer,
  [SAVE_VISIT_TO_DB_END]: saveVisitDataFailReducer,
  [SAVE_DOCTOR_COORDINATES_SUCCESS]: saveDoctorCoordinatesSuccessReducer,
  [SAVE_DOCTOR_COORDINATES_FAIL]: saveDoctorCoordinatesFailReducer,
  [INIT_VISIT_COMMENTS_SUCCESS]: initVisitCommentsSuccessReducer,
  [INIT_VISIT_COMMENTS_FAIL]: initVisitCommentsFailReducer,
  [RESET_CALL_SUCCESS]: resetCallSuccessReducer,
});
