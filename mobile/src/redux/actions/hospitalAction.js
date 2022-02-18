import {
  DELETE_HOSPITAL_ENTRY_FAIL,
  DELETE_HOSPITAL_ENTRY_START,
  DELETE_HOSPITAL_ENTRY_SUCCESS,
  HOSPITAL_DAILY_DETAILS_FAIL,
  HOSPITAL_DAILY_DETAILS_START,
  HOSPITAL_DAILY_DETAILS_SUCCESS,
  HOSPITAL_ENTRY_FAIL,
  HOSPITAL_ENTRY_START,
  HOSPITAL_ENTRY_SUCCESS,
  HOSPITAL_MONTHLY_DETAILS_FAIL,
  HOSPITAL_MONTHLY_DETAILS_START,
  HOSPITAL_MONTHLY_DETAILS_SUCCESS,
  INIT_HOSPITAL_DAILY_ENTRY_FAIL,
  INIT_HOSPITAL_DAILY_ENTRY_START,
  INIT_HOSPITAL_DAILY_ENTRY_SUCCESS,
  INIT_HOSPITAL_ENTRY_FAIL,
  INIT_HOSPITAL_ENTRY_START,
  INIT_HOSPITAL_ENTRY_SUCCESS,
  INIT_HOSPITAL_LIST_FAIL,
  INIT_HOSPITAL_LIST_START,
  INIT_HOSPITAL_LIST_SUCCESS,
  SAVE_HOSPITAL_DAILY_ENTRY_FAIL,
  SAVE_HOSPITAL_DAILY_ENTRY_START,
  SAVE_HOSPITAL_DAILY_ENTRY_SUCCESS,
} from './actionConstants';
import {showErrorMessage, showSuccessMessage} from '../../widgets/showMessage';

export const initHospitalListStartAction = payload => dispatch => {
  dispatch({
    type: INIT_HOSPITAL_LIST_START,
    payload: payload,
  });
};

export const initHospitalListSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Loaded Hospital list',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: INIT_HOSPITAL_LIST_SUCCESS,
    payload: payload,
  });
};

export const initHospitalListFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to load Hospital lists',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: INIT_HOSPITAL_LIST_FAIL,
    payload: payload,
  });
};

export const saveHospitalEntryStartAction = payload => dispatch => {
  dispatch({
    type: HOSPITAL_ENTRY_START,
    payload: payload,
  });
};

export const saveHospitalEntrySuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Entry Saved successfully',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: HOSPITAL_ENTRY_SUCCESS,
    payload: payload,
  });
};

export const saveHospitalEntryFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to save Entry',
  });
  dispatch({
    type: HOSPITAL_ENTRY_FAIL,
    payload: payload,
  });
};

export const initHospitalEntryStartAction = payload => dispatch => {
  dispatch({
    type: INIT_HOSPITAL_ENTRY_START,
    payload: payload,
  });
};

export const initHospitalEntrySuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Loaded entries successfully',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: INIT_HOSPITAL_ENTRY_SUCCESS,
    payload: payload,
  });
};

export const initHospitalEntryFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to load entries',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: INIT_HOSPITAL_ENTRY_FAIL,
    payload: payload,
  });
};

export const deleteHospitalEntryStartAction = payload => dispatch => {
  dispatch({
    type: DELETE_HOSPITAL_ENTRY_START,
    payload: payload,
  });
};

export const deleteHospitalEntrySuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Entry deleted successfully',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: DELETE_HOSPITAL_ENTRY_SUCCESS,
    payload: payload,
  });
};

export const deleteHospitalEntryFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to delete the entry',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: DELETE_HOSPITAL_ENTRY_FAIL,
    payload: payload,
  });
};

export const initHospitalDailyEntryStartAction = payload => dispatch => {
  dispatch({
    type: INIT_HOSPITAL_DAILY_ENTRY_START,
    payload: payload,
  });
};

export const initHospitalDailyEntrySuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Loaded Daily entries successfully',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: INIT_HOSPITAL_DAILY_ENTRY_SUCCESS,
    payload: payload,
  });
};

export const initHospitalDailyEntryFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to load Daily entries',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: INIT_HOSPITAL_DAILY_ENTRY_FAIL,
    payload: payload,
  });
};

export const saveHospitalDailyEntryStartAction = payload => dispatch => {
  dispatch({
    type: SAVE_HOSPITAL_DAILY_ENTRY_START,
    payload: payload,
  });
};

export const saveHospitalDailyEntrySuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Saved entry successfully',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: SAVE_HOSPITAL_DAILY_ENTRY_SUCCESS,
    payload: payload,
  });
};

export const saveHospitalDailyEntryFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to save entry',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: SAVE_HOSPITAL_DAILY_ENTRY_FAIL,
    payload: payload,
  });
};

export const hospitalDailyDetailStartAction = payload => dispatch => {
  dispatch({
    type: HOSPITAL_DAILY_DETAILS_START,
    payload: payload,
  });
};

export const hospitalDailyDetailSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Loaded Data',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: HOSPITAL_DAILY_DETAILS_SUCCESS,
    payload: payload,
  });
};

export const hospitalDailyDetailFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to load data',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: HOSPITAL_DAILY_DETAILS_FAIL,
    payload: payload,
  });
};

export const hospitalMonthlyDetailStartAction = payload => dispatch => {
  dispatch({
    type: HOSPITAL_MONTHLY_DETAILS_START,
    payload: payload,
  });
};

export const hospitalMonthlyDetailSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Loaded Data',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: HOSPITAL_MONTHLY_DETAILS_SUCCESS,
    payload: payload,
  });
};

export const hospitalMonthlyDetailFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to load data',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: HOSPITAL_MONTHLY_DETAILS_FAIL,
    payload: payload,
  });
};
