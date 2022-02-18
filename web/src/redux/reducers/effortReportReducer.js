import { createReducer } from './reducerUtils';
import {
    EXPAND_EFFORT_REPORT_FAIL,
    EXPAND_EFFORT_REPORT_SUCCESS,
    FETCH_DAILY_EFFORT_REPORT_FAIL,
    FETCH_DAILY_EFFORT_REPORT_SUCCESS, FETCH_DEVIATION_VISIT_REPORT_FAIL,
    FETCH_DEVIATION_VISIT_REPORT_SUCCESS,
    FETCH_DOCTOR_VISIT_REPORT_FAIL,
    FETCH_DOCTOR_VISIT_REPORT_SUCCESS,
    FETCH_EFFORT_REPORT_FAIL,
    FETCH_EFFORT_REPORT_SUCCESS
} from "../actions/reports/effort/effortReportActionConstants";
const initialState = {
  effortData: [],
  dailyEffortData: [],
  doctorVisitData:[],
    deviationData: [],
  refresh: Date(),
  error: {}
};

const effortSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
      effortData: payload.effortData
  };
};

const effortFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const dailyEffortSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    dailyEffortData: payload.dailyEffortData,
    refresh: new Date()
  };
};

const dailyEffortFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const doctorVisitSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    doctorVisitData: payload.doctorVisitData,
    refresh: new Date()
  };
};

const doctorVisitFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const expandEffortReportSuccessReducer = (state = initialState, payload) => {
    let data = state.effortData;
    data.forEach((row, i) => {
        if (row.locationId === payload.parentLocation) {
            row.childData = payload.effortData;
            data[i] = row;
        }
    });
    return {
        ...state,
        effortData: data,
        refresh: Date()
    };
};

const expandEffortReportFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error,
    };
};

const deviationSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        deviationData: payload.deviationReport,
        refresh: new Date()
    };
};

const deviationFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error,
    };
};


export default createReducer(initialState, {
  [FETCH_EFFORT_REPORT_SUCCESS]: effortSuccessReducer,
  [FETCH_EFFORT_REPORT_FAIL]: effortFailReducer,
  [EXPAND_EFFORT_REPORT_SUCCESS]: expandEffortReportSuccessReducer,
  [EXPAND_EFFORT_REPORT_FAIL]: expandEffortReportFailReducer,
  [FETCH_DAILY_EFFORT_REPORT_SUCCESS]: dailyEffortSuccessReducer,
  [FETCH_DAILY_EFFORT_REPORT_FAIL]: dailyEffortFailReducer,
  [FETCH_DOCTOR_VISIT_REPORT_SUCCESS]: doctorVisitSuccessReducer,
  [FETCH_DOCTOR_VISIT_REPORT_FAIL]: doctorVisitFailReducer,
  [FETCH_DEVIATION_VISIT_REPORT_SUCCESS]: deviationSuccessReducer,
  [FETCH_DEVIATION_VISIT_REPORT_FAIL]: deviationFailReducer,
});
