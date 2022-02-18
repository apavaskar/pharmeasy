import {toYyyyMm} from '../../utils/dateUtil';
import {createReducer} from './reducerUtils';
import {
  HOSPITAL_DAILY_DASHBOARD_FAIL,
  HOSPITAL_DAILY_DASHBOARD_SUCCESS,
  HOSPITAL_DAILY_DETAILS_FAIL,
  HOSPITAL_DAILY_DETAILS_SUCCESS,
  HOSPITAL_MONTHLY_DASHBOARD_FAIL,
  HOSPITAL_MONTHLY_DASHBOARD_SUCCESS,
  HOSPITAL_MONTHLY_DETAILS_FAIL,
  HOSPITAL_MONTHLY_DETAILS_SUCCESS,
} from '../actions/actionConstants';
import {
  LOAD_CRM_DASHBOARD_FAIL,
  LOAD_CRM_DASHBOARD_SUCCESS,
} from '../actions/dashboard/dashboardActionConstant';

const initialState = {
  yearMonth: toYyyyMm(Date()),
  dailyHospitalSummary: [],
  monthlyHospitalSummary: {},
  monthlyHospitalDetails: {},
  dailyHospitalDetails: {},
  reloadHospitalSummary: new Date().getTime(),
  reloadHospitalDetails: new Date().getTime(),
  data: {},
  dailyCalls: [],
  productStages: [],
  error: {},
};

const hospitalDailyDashboardSuccessReducer = (
  state = initialState,
  payload,
) => {
  let summary = state.dailyHospitalSummary;
  let details = state.dailyHospitalDetails;
  if (payload.drilldown) {
    details[payload.locationId] = payload.dailyHospitalSummary;
  } else {
    summary = payload.dailyHospitalSummary;
  }

  return {
    ...state,
    dailyHospitalSummary: summary,
    dailyHospitalDetails: details,
    yearMonth: payload.yearMonth,
    reloadHospitalDetails: new Date().getTime(),
  };
};

const hospitalDailyDashboardFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const hospitalDailyDetailsSuccessReducer = (state = initialState, payload) => {
  let details = state.dailyHospitalDetails;
  details[payload.locationId] = payload.dailyHospitalDetails;
  return {
    ...state,
    dailyHospitalDetails: details,
    reloadHospitalDetails: new Date().getTime(),
    yearMonth: payload.yearMonth,
  };
};
const hospitalDailyDetailsFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const hospitalMonthlyDashboardSuccessReducer = (
  state = initialState,
  payload,
) => {
  let summary = state.monthlyHospitalSummary;
  let details = state.monthlyHospitalDetails;
  if (payload.drilldown) {
    details[payload.locationId] = payload.monthlyHospitalSummary;
  } else {
    summary = payload.monthlyHospitalSummary;
  }

  return {
    ...state,
    monthlyHospitalSummary: summary,
    monthlyHospitalDetails: details,
    yearMonth: payload.yearMonth,
    reloadHospitalSummary: new Date().getTime(),
  };
};
const hospitalMonthlyDashboardFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const hospitalMonthlyDetailsSuccessReducer = (
  state = initialState,
  payload,
) => {
  let details = state.monthlyHospitalDetails;
  details[payload.locationId] = payload.monthlyHospitalDetails;
  return {
    ...state,
    monthlyHospitalDetails: details,
    reloadHospitalSummary: new Date().getTime(),
    yearMonth: payload.yearMonth,
  };
};
const hospitalMonthlyDetailsFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const loadCRMDashboardSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    productStages: payload.stages,
  };
};
const loadCRMDashboardFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

export default createReducer(initialState, {
  [HOSPITAL_DAILY_DASHBOARD_SUCCESS]: hospitalDailyDashboardSuccessReducer,
  [HOSPITAL_DAILY_DASHBOARD_FAIL]: hospitalDailyDashboardFailReducer,
  [HOSPITAL_DAILY_DETAILS_SUCCESS]: hospitalDailyDetailsSuccessReducer,
  [HOSPITAL_DAILY_DETAILS_FAIL]: hospitalDailyDetailsFailReducer,
  [HOSPITAL_MONTHLY_DASHBOARD_SUCCESS]: hospitalMonthlyDashboardSuccessReducer,
  [HOSPITAL_MONTHLY_DASHBOARD_FAIL]: hospitalMonthlyDashboardFailReducer,
  [HOSPITAL_MONTHLY_DETAILS_SUCCESS]: hospitalMonthlyDetailsSuccessReducer,
  [HOSPITAL_MONTHLY_DETAILS_FAIL]: hospitalMonthlyDetailsFailReducer,
  [LOAD_CRM_DASHBOARD_SUCCESS]: loadCRMDashboardSuccessReducer,
  [LOAD_CRM_DASHBOARD_FAIL]: loadCRMDashboardFailReducer,
});
