import {createReducer} from './reducerUtils';
import {
  ADD_BEATS_TO_PLAN_FAIL_ACTION,
  ADD_BEATS_TO_PLAN_SUCCESS_ACTION,
  CHANGE_PLAN_TYPE_FAIL_ACTION,
  CHANGE_PLAN_TYPE_SUCCESS_ACTION,
  FETCH_PLAN_SUMMARY_FAIL,
  FETCH_PLAN_SUMMARY_SUCCESS,
  INIT_MANAGER_PLAN_TO_LOCAL_FAIL,
  INIT_MANAGER_PLAN_TO_LOCAL_SUCCESS,
  INIT_NON_CALL_FAIL,
  INIT_NON_CALL_SUCCESS,
  INIT_PLAN_FAIL_ACTION,
  INIT_PLAN_SUCCESS_ACTION,
  REMOVE_DOCTOR_FROM_PLAN_FAIL,
  REMOVE_DOCTOR_FROM_PLAN_SUCCESS,
  RESET_TOUR_PLAN_FAIL,
  RESET_TOUR_PLAN_SUCCESS,
  SAVE_DOCTOR_TO_PLAN_FAIL,
  SAVE_DOCTOR_TO_PLAN_SUCCESS,
  SAVE_MANAGER_PLAN_TO_LOCAL_FAIL,
  SAVE_MANAGER_PLAN_TO_LOCAL_SUCCESS,
  SAVE_NON_CALL_TO_PLAN_FAIL,
  SAVE_NON_CALL_TO_PLAN_SUCCESS,
} from '../actions/actionConstants';
import {toYyyyMm, toYyyyMmDd} from '../../utils/dateUtil';
import {generateId} from '../../db/constants';
import {CALL_TYPE_FIELD} from '../../configs/AppConstants';

const initialState = {
  planDate: Date(),
  currentAction: 0,
  activities: [],
  beatsPlanned: [],
  planSummary: {doctors: 0, chemists: 0, beats: 0, nca: 0, leaves: 0},
  refreshSummary: new Date().getTime(),
  refreshDoctorList: new Date().getTime(),
  allNonCallActivities: [],
  plannedNonCallActivities: [],
  plannedLocationIds: [],
  error: {},
};

const changePlanTypeFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const changePlanTypeSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    currentAction: payload.currentAction,
    error: {},
  };
};

const initPlanSuccessReducer = (state = initialState, payload) => {
  const beatsPlanned = payload.beatsPlanned;
  let beatsArray = [];
  if (beatsPlanned !== undefined) {
    for (const [key, value] of Object.entries(beatsPlanned)) {
      beatsArray.push(value);
    }
  }
  return {
    ...state,
    beatsPlanned: beatsArray,
    activities: payload.activities,
    plannedNonCallActivities: payload.plannedNonCallActivities,
    planDate: payload.planDate,
    refreshSummary: new Date().getTime(),
    currentAction: 0,
  };
};

const initPlanFailReducer = (state = initialState, payload) => {
  return {...state};
};

const addBeatsToPlanSuccessReducer = (state = initialState, payload) => {
  let map = {};
  state.activities.forEach(activity => (map[activity.doctorId] = activity));
  let activities = state.activities;
  payload.doctors.forEach(doctor => {
    if (map[doctor.id] === undefined) {
      const activity = {
        id: generateId(),
        planDate: state.planDate,
        doctorId: doctor.id,
        planId: '',
        planDateYyyyMm: toYyyyMm(state.planDate),
        planDateYyyyMmDd: toYyyyMmDd(state.planDate),
        planLocationId: doctor.locationId,
        planned: 1,
        visited: 0,
        status: 'A',
        doctor: doctor,
        activityType: CALL_TYPE_FIELD,
      };
      activities.push(activity);
    } else {
      const activity = map[doctor.id];
      activity.status = 'A';
      const filtered = state.activities.filter(act => act.id !== activity.id);
      activities = filtered;
      activities.push(activity);
    }
  });
  return {
    ...state,
    activities: activities,
    refreshDoctorList: new Date().getTime(),
  };
};

const addBeatsToPlanFailReducer = (state = initialState, payload) => {
  return {...state};
};

const removeDoctorFromPlanSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    activities: payload.activities,
    refreshDoctorList: new Date().getTime(),
  };
};

const removeDoctorFromPlanFailReducer = (state = initialState, payload) => {
  return {...state};
};

const saveDoctorsToPlanSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    activities: payload.activities,
    refreshSummary: new Date().getTime(),
  };
};

const saveDoctorsToPlanFailReducer = (state = initialState, payload) => {
  return {...state};
};

const fetchPlanSummarySuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    planSummary: payload.summary,
  };
};

const fetchPlanSummaryFailReducer = (state = initialState, payload) => {
  return {...state, error: payload.error};
};

const initNonCallSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    plannedNonCallActivities: payload.plannedNonCallActivities,
    allNonCallActivities: payload.allNoncallActivities,
  };
};

const initNonCallFailReducer = (state = initialState, payload) => {
  return {...state, error: payload.error};
};

const saveNonCallToPlanSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    refreshSummary: new Date().getTime(),
  };
};

const saveNonCallToPlanFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const saveManagerPlanToLocalSuccessReducer = (
  state = initialState,
  payload,
) => {
  return {
    ...state,
  };
};

const saveManagerPlanToLocalFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const initManagerPlanToLocalSuccessReducer = (
  state = initialState,
  payload,
) => {
  return {
    ...state,
    plannedLocationIds: payload.result,
  };
};

const initManagerPlanToLocalFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const resetTourPlanReducer = (state = initialState, payload) => {
  return initialState;
};

export default createReducer(initialState, {
  [INIT_PLAN_SUCCESS_ACTION]: initPlanSuccessReducer,
  [INIT_PLAN_FAIL_ACTION]: initPlanFailReducer,
  [CHANGE_PLAN_TYPE_FAIL_ACTION]: changePlanTypeFailReducer,
  [CHANGE_PLAN_TYPE_SUCCESS_ACTION]: changePlanTypeSuccessReducer,
  [ADD_BEATS_TO_PLAN_SUCCESS_ACTION]: addBeatsToPlanSuccessReducer,
  [ADD_BEATS_TO_PLAN_FAIL_ACTION]: addBeatsToPlanFailReducer,
  [REMOVE_DOCTOR_FROM_PLAN_SUCCESS]: removeDoctorFromPlanSuccessReducer,
  [REMOVE_DOCTOR_FROM_PLAN_FAIL]: removeDoctorFromPlanFailReducer,
  [SAVE_DOCTOR_TO_PLAN_SUCCESS]: saveDoctorsToPlanSuccessReducer,
  [SAVE_DOCTOR_TO_PLAN_FAIL]: saveDoctorsToPlanFailReducer,
  [FETCH_PLAN_SUMMARY_SUCCESS]: fetchPlanSummarySuccessReducer,
  [FETCH_PLAN_SUMMARY_FAIL]: fetchPlanSummaryFailReducer,
  [INIT_NON_CALL_SUCCESS]: initNonCallSuccessReducer,
  [INIT_NON_CALL_FAIL]: initNonCallFailReducer,
  [SAVE_NON_CALL_TO_PLAN_SUCCESS]: saveNonCallToPlanSuccessReducer,
  [SAVE_NON_CALL_TO_PLAN_FAIL]: saveNonCallToPlanFailReducer,
  [SAVE_MANAGER_PLAN_TO_LOCAL_SUCCESS]: saveManagerPlanToLocalSuccessReducer,
  [SAVE_MANAGER_PLAN_TO_LOCAL_FAIL]: saveManagerPlanToLocalFailReducer,
  [INIT_MANAGER_PLAN_TO_LOCAL_SUCCESS]: initManagerPlanToLocalSuccessReducer,
  [INIT_MANAGER_PLAN_TO_LOCAL_FAIL]: initManagerPlanToLocalFailReducer,
  [RESET_TOUR_PLAN_SUCCESS]: resetTourPlanReducer,
  [RESET_TOUR_PLAN_FAIL]: resetTourPlanReducer,
});
