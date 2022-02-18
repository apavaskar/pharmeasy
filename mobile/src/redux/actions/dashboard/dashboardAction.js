import {
  HOSPITAL_DAILY_DASHBOARD_FAIL,
  HOSPITAL_DAILY_DASHBOARD_START,
  HOSPITAL_DAILY_DASHBOARD_SUCCESS,
  HOSPITAL_MONTHLY_DASHBOARD_FAIL,
  HOSPITAL_MONTHLY_DASHBOARD_START,
  HOSPITAL_MONTHLY_DASHBOARD_SUCCESS,
  INIT_DASHBOARD_FAIL,
  INIT_DASHBOARD_SUCCESS,
} from '../actionConstants';
import {
  LOAD_CALL_DASHBOARD_FAIL,
  LOAD_CALL_DASHBOARD_START,
  LOAD_CALL_DASHBOARD_SUCCESS,
  LOAD_CRM_DASHBOARD_FAIL,
  LOAD_CRM_DASHBOARD_START,
  LOAD_CRM_DASHBOARD_SUCCESS,
  LOAD_NOTIFICATIONS_FAIL,
  LOAD_NOTIFICATIONS_START,
  LOAD_NOTIFICATIONS_SUCCESS,
} from './dashboardActionConstant';

export const hospitalDailyDashboardStartAction = payload => dispatch => {
  dispatch({
    type: HOSPITAL_DAILY_DASHBOARD_START,
    payload: payload,
  });
};

export const hospitalDailyDashboardSuccessAction = payload => dispatch => {
  showMessage({
    message: 'Daily Dashboard Dashboard loaded',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 1000,
  });
  dispatch({
    type: INIT_DASHBOARD_FAIL,
    payload: payload,
  });
  dispatch({
    type: HOSPITAL_DAILY_DASHBOARD_SUCCESS,
    payload: payload,
  });
};

export const hospitalDailyDashboardFailAction = payload => dispatch => {
  showMessage({
    message: 'Daily Dashboard Dashboard failed',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: INIT_DASHBOARD_FAIL,
    payload: payload,
  });

  dispatch({
    type: HOSPITAL_DAILY_DASHBOARD_FAIL,
    payload: payload,
  });
};

export const hospitalMonthlyDashboardStartAction = payload => dispatch => {
  dispatch({
    type: HOSPITAL_MONTHLY_DASHBOARD_START,
    payload: payload,
  });
};

export const hospitalMonthlyDashboardSuccessAction = payload => dispatch => {
  dispatch({
    type: HOSPITAL_MONTHLY_DASHBOARD_SUCCESS,
    payload: payload,
  });
};

export const hospitalMonthlyDashboardFailAction = payload => dispatch => {
  dispatch({
    type: HOSPITAL_MONTHLY_DASHBOARD_FAIL,
    payload: payload,
  });
};

export const initDashboardStartAction = payload => dispatch => {
  dispatch({
    type: INIT_DASHBOARD_START_ACTION,
    payload: payload,
  });
};

export const initDashboardSuccessAction = payload => dispatch => {
  dispatch({
    type: INIT_DASHBOARD_SUCCESS,
    payload: payload,
  });
};

export const initDashboardFailAction = payload => dispatch => {
  console.log(payload);
  dispatch({
    type: INIT_DASHBOARD_FAIL,
    payload: payload,
  });
};

export const loadNotificationsStartAction = payload => dispatch => {
  dispatch({
    type: LOAD_NOTIFICATIONS_START,
    payload: payload,
  });
};

export const loadNotificationsSuccessAction = payload => dispatch => {
  dispatch({
    type: LOAD_NOTIFICATIONS_SUCCESS,
    payload: payload,
  });
};

export const loadNotificationsFailAction = payload => dispatch => {
  console.log(payload);
  dispatch({
    type: LOAD_NOTIFICATIONS_FAIL,
    payload: payload,
  });
};

export const loadCRMDashboardStartAction = payload => dispatch => {
  dispatch({
    type: LOAD_CRM_DASHBOARD_START,
    payload: payload,
  });
};

export const loadCRMDashboardSuccessAction = payload => dispatch => {
  dispatch({
    type: LOAD_CRM_DASHBOARD_SUCCESS,
    payload: payload,
  });
};

export const loadCRMDashboardFailAction = payload => dispatch => {
  console.log(payload);
  dispatch({
    type: LOAD_CRM_DASHBOARD_FAIL,
    payload: payload,
  });
};

export const loadCallDashboardStartAction = payload => dispatch => {
  dispatch({
    type: LOAD_CALL_DASHBOARD_START,
    payload: payload,
  });
};

export const loadCallDashboardSuccessAction = payload => dispatch => {
  dispatch({
    type: LOAD_CALL_DASHBOARD_SUCCESS,
    payload: payload,
  });
};

export const loadCallDashboardFailAction = payload => dispatch => {
  dispatch({
    type: LOAD_CALL_DASHBOARD_FAIL,
    payload: payload,
  });
};
