import {
  HOSPITAL_DAILY_DASHBOARD_FAIL,
  HOSPITAL_DAILY_DASHBOARD_START,
  HOSPITAL_DAILY_DASHBOARD_SUCCESS,
  HOSPITAL_MONTHLY_DASHBOARD_FAIL,
  HOSPITAL_MONTHLY_DASHBOARD_START,
  HOSPITAL_MONTHLY_DASHBOARD_SUCCESS,
  INIT_DASHBOARD_FAIL,
  INIT_DASHBOARD_START,
  INIT_DASHBOARD_SUCCESS,
} from './actionConstants';
import {showErrorMessage, showSuccessMessage} from '../../widgets/showMessage';

export const hospitalDailyDashboardStartAction = payload => dispatch => {
  dispatch({
    type: HOSPITAL_DAILY_DASHBOARD_START,
    payload: payload,
  });
};

export const hospitalDailyDashboardSuccessAction = payload => dispatch => {
  showSuccessMessage({
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
  showErrorMessage({
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
