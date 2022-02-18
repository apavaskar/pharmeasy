import {
  ADD_BEATS_TO_PLAN_FAIL_ACTION,
  ADD_BEATS_TO_PLAN_START_ACTION,
  ADD_BEATS_TO_PLAN_SUCCESS_ACTION,
  ADD_DOCTORS_TO_PLAN_START_ACTION,
  CHANGE_PLAN_TYPE_FAIL_ACTION,
  CHANGE_PLAN_TYPE_START_ACTION,
  CHANGE_PLAN_TYPE_SUCCESS_ACTION,
  FETCH_PLAN_SUMMARY_FAIL,
  FETCH_PLAN_SUMMARY_START,
  FETCH_PLAN_SUMMARY_SUCCESS,
  INIT_MANAGER_PLAN_TO_LOCAL_FAIL,
  INIT_MANAGER_PLAN_TO_LOCAL_START,
  INIT_MANAGER_PLAN_TO_LOCAL_SUCCESS,
  INIT_NON_CALL_FAIL,
  INIT_NON_CALL_START,
  INIT_NON_CALL_SUCCESS,
  INIT_PLAN_FAIL_ACTION,
  INIT_PLAN_START_ACTION,
  INIT_PLAN_SUCCESS_ACTION,
  REMOVE_DOCTOR_FROM_PLAN_FAIL,
  REMOVE_DOCTOR_FROM_PLAN_START,
  REMOVE_DOCTOR_FROM_PLAN_SUCCESS,
  RESET_TOUR_PLAN_FAIL,
  RESET_TOUR_PLAN_START,
  RESET_TOUR_PLAN_SUCCESS,
  SAVE_DOCTOR_TO_PLAN_FAIL,
  SAVE_DOCTOR_TO_PLAN_START,
  SAVE_DOCTOR_TO_PLAN_SUCCESS,
  SAVE_MANAGER_PLAN_TO_LOCAL_FAIL,
  SAVE_MANAGER_PLAN_TO_LOCAL_START,
  SAVE_MANAGER_PLAN_TO_LOCAL_SUCCESS,
  SAVE_NON_CALL_TO_PLAN_FAIL,
  SAVE_NON_CALL_TO_PLAN_START,
  SAVE_NON_CALL_TO_PLAN_SUCCESS,
} from './actionConstants';
import {showErrorMessage, showSuccessMessage} from '../../widgets/showMessage';

export const changePlanTypeStartAction = payload => dispatch => {
  dispatch({
    type: CHANGE_PLAN_TYPE_START_ACTION,
    payload: payload,
  });
};

export const changePlanTypeSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: `Loaded ${payload.planType} for ${payload.planDate}`,
  });
  dispatch({
    type: CHANGE_PLAN_TYPE_SUCCESS_ACTION,
    payload: payload,
  });
};

export const changePlanTypeFailAction = payload => dispatch => {
  showErrorMessage({
    message: `Failed to load ${payload.planType} for ${payload.planDate}`,
  });
  dispatch({
    type: CHANGE_PLAN_TYPE_FAIL_ACTION,
    payload: payload,
  });
};

export const initPlanStartAction = payload => dispatch => {
  dispatch({
    type: INIT_PLAN_START_ACTION,
    payload: payload,
  });
};

export const initPlanSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Plan initialized successfully',
  });
  dispatch({
    type: INIT_PLAN_SUCCESS_ACTION,
    payload: payload,
  });
};

export const initPlanFailAction = payload => dispatch => {
  showErrorMessage({
    message: `Failed to load plan, ${payload.error.message}`,
  });
  dispatch({
    type: INIT_PLAN_FAIL_ACTION,
    payload: payload,
  });
};

export const addBeatsToPlanStartAction = payload => dispatch => {
  dispatch({
    type: ADD_BEATS_TO_PLAN_START_ACTION,
    payload: payload,
  });
};

export const addDoctorsToPlanStartAction = payload => dispatch => {
  dispatch({
    type: ADD_DOCTORS_TO_PLAN_START_ACTION,
    payload: payload,
  });
};

export const addBeatsToPlanSuccessAction = payload => dispatch => {
  dispatch({
    type: ADD_BEATS_TO_PLAN_SUCCESS_ACTION,
    payload: payload,
  });
};

export const addBeatsToPlanFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to fetch doctors for the Patch',
  });
  dispatch({
    type: ADD_BEATS_TO_PLAN_FAIL_ACTION,
    payload: payload,
  });
};

export const removeDoctorFromPlanStartAction = payload => dispatch => {
  dispatch({
    type: REMOVE_DOCTOR_FROM_PLAN_START,
    payload: payload,
  });
};

export const removeDoctorFromPlanSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Doctor removed from Plan successfully',
  });
  dispatch({
    type: REMOVE_DOCTOR_FROM_PLAN_SUCCESS,
    payload: payload,
  });
};

export const removeDoctorFromPlanFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Doctor remove failed',
  });
  dispatch({
    type: REMOVE_DOCTOR_FROM_PLAN_FAIL,
    payload: payload,
  });
};

export const saveDoctorsToPlanStartAction = payload => dispatch => {
  dispatch({
    type: SAVE_DOCTOR_TO_PLAN_START,
    payload: payload,
  });
};

export const saveDoctorsToPlanSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Doctors Saved to Plan',
  });
  dispatch({
    type: SAVE_DOCTOR_TO_PLAN_SUCCESS,
    payload: payload,
  });
};

export const saveDoctorsToPlanFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to save doctors to plan. Please try again',
  });
  dispatch({
    type: SAVE_DOCTOR_TO_PLAN_FAIL,
    payload: payload,
  });
};

export const fetchPlanSummaryStartAction = payload => dispatch => {
  dispatch({
    type: FETCH_PLAN_SUMMARY_START,
    payload: payload,
  });
};

export const fetchPlanSummarySuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Summary fetched successfully',
  });
  dispatch({
    type: FETCH_PLAN_SUMMARY_SUCCESS,
    payload: payload,
  });
};

export const fetchPlanSummaryFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Summary fetch failed',
  });
  dispatch({
    type: FETCH_PLAN_SUMMARY_FAIL,
    payload: payload,
  });
};

export const initNonCallStartAction = payload => dispatch => {
  dispatch({
    type: INIT_NON_CALL_START,
    payload: payload,
  });
};

export const initNonCallSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Noncall Activities initialized',
  });
  dispatch({
    type: INIT_NON_CALL_SUCCESS,
    payload: payload,
  });
};

export const initNonCallFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Noncall Activities failed',
  });
  dispatch({
    type: INIT_NON_CALL_FAIL,
    payload: payload,
  });
};

export const saveNonCallActivitiesStartAction = payload => dispatch => {
  dispatch({
    type: SAVE_NON_CALL_TO_PLAN_START,
    payload: payload,
  });
};

export const saveNonCallActivitiesSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Non call activities saved to plan successfully',
  });
  dispatch({
    type: SAVE_NON_CALL_TO_PLAN_SUCCESS,
    payload: payload,
  });
};

export const saveNonCallActivitiesFailAction = payload => dispatch => {
  showErrorMessage({
    message: `Failed to save noncall activities, ${payload.error}`,
  });
  dispatch({
    type: SAVE_NON_CALL_TO_PLAN_FAIL,
    payload: payload,
  });
};

export const saveManagerDoctorToLocalStartAction = payload => dispatch => {
  dispatch({
    type: SAVE_MANAGER_PLAN_TO_LOCAL_START,
    payload: payload,
  });
};

export const saveManagerDoctorToLocalSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Saved plan',
  });
  dispatch({
    type: SAVE_MANAGER_PLAN_TO_LOCAL_SUCCESS,
    payload: payload,
  });
};

export const saveManagerDoctorToLocalFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to save plan',
  });
  dispatch({
    type: SAVE_MANAGER_PLAN_TO_LOCAL_FAIL,
    payload: payload,
  });
};

export const initManagerPlanStartAction = payload => dispatch => {
  dispatch({
    type: INIT_MANAGER_PLAN_TO_LOCAL_START,
    payload: payload,
  });
};

export const initManagerPlanSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Loaded plan',
  });
  dispatch({
    type: INIT_MANAGER_PLAN_TO_LOCAL_SUCCESS,
    payload: payload,
  });
};

export const initManagerPlanFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Load failed',
  });
  dispatch({
    type: INIT_MANAGER_PLAN_TO_LOCAL_FAIL,
    payload: payload,
  });
};

export const resetPlanStartAction = payload => dispatch => {
  dispatch({
    type: RESET_TOUR_PLAN_START,
    payload: payload,
  });
};

export const resetPlanSuccessAction = payload => dispatch => {
  dispatch({
    type: RESET_TOUR_PLAN_SUCCESS,
    payload: payload,
  });
};

export const resetPlanFailAction = payload => dispatch => {
  dispatch({
    type: RESET_TOUR_PLAN_FAIL,
    payload: payload,
  });
};
