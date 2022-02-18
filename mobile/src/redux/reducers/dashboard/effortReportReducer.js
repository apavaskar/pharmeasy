import {createReducer} from '../reducerUtils';
import {
  COVERAGE_REPORT_FAIL,
  COVERAGE_REPORT_START,
  COVERAGE_REPORT_SUCCESS,
  MISSED_CALL_REPORT_FAIL,
  MISSED_CALL_REPORT_START,
  MISSED_CALL_REPORT_SUCCESS,
} from '../../actions/dashboard/effortReportActionConstant';

const initialState = {
  rawCoverageData: [],
  coverageData: {},
  callAverageData: {},
  missedCallData: [],
  loadingEffort: false,
  loadingMissedCall: false,
  error: {},
};

const coverageReportStartReducer = (state = initialState, payload) => {
  return {
    ...state,
    loadingEffort: true,
  };
};

const coverageReportSuccessReducer = (state = initialState, payload) => {
  let summary = {
    coreDrVisited: 0,
    coreDrCount: 0,
    superCoreDrVisited: 0,
    superCoreDrCount: 0,
    totalDrVisited: 0,
    totalDrCount: 0,
    coreDrCall: 0,
    superCoreDrCall: 0,
    nonCoreDrCall: 0,
    totalDrCall: 0,
    coreDrCallAvg: 0,
    superCoreDrCallAvg: 0,
    nonCoreDrCallAvg: 0,
    totalDrCallAvg: 0,
    totalFieldDays: 0,
  };

  payload.data.forEach(row => {
    if (row.locat_type_id === 'loctt00000000000000000000000000000003') {
      summary.coreDrVisited += row.core_dr_count_visited;
      summary.coreDrCount += row.core_count;

      summary.superCoreDrVisited += row.super_core_dr_count_visited;
      summary.superCoreDrCount += row.super_core_count;

      summary.totalDrVisited += row.total_dr_count_visited;
      summary.totalDrCount += row.total_count;

      summary.coreDrCall = summary.coreDrCall + row.core_dr_call_count;
      summary.superCoreDrCall += row.super_core_dr_call_count;
      summary.nonCoreDrCall += row.non_core_dr_call_count;
      summary.totalDrCall += row.total_dr_call_count;
      summary.totalFieldDays += row.field_days;
    }
  });

  const coverageData = {
    coreCoverage:
      summary.coreDrCount === 0
        ? 0
        : ((summary.coreDrVisited / summary.coreDrCount) * 100).toFixed(0),
    superCoreCoverage:
      summary.superCoreDrCount === 0
        ? 0
        : (
            (summary.superCoreDrVisited / summary.superCoreDrCount) *
            100
          ).toFixed(0),
    totalCoverage:
      summary.totalDrCount === 0
        ? 0
        : ((summary.totalDrVisited / summary.totalDrCount) * 100).toFixed(0),
  };

  const callAverageData = {
    superCoreDrCallAvg:
      summary.totalFieldDays === 0
        ? 0
        : parseInt(summary.superCoreDrCall / summary.totalFieldDays),
    coreDrCallAvg:
      summary.totalFieldDays === 0
        ? 0
        : parseInt(summary.coreDrCall / summary.totalFieldDays),
    nonCoreDrCallAvg:
      summary.totalFieldDays === 0
        ? 0
        : parseInt(summary.nonCoreDrCall / summary.totalFieldDays),
    overallDrCallAvg:
      summary.totalFieldDays === 0
        ? 0
        : parseInt(summary.totalDrCall / summary.totalFieldDays),
  };
  return {
    ...state,
    coverageData: coverageData,
    callAverageData: callAverageData,
    rawCoverageData: payload.data,
    loadingEffort: false,
  };
};

const coverageReportFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const missedCallReportStartReducer = (state = initialState, payload) => {
  return {
    ...state,
    loadingMissedCall: true,
  };
};

const missedCallReportSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    missedCallData: payload.data,
    loadingMissedCall: false,
  };
};

const missedCallReportFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

export default createReducer(initialState, {
  [COVERAGE_REPORT_START]: coverageReportStartReducer,
  [COVERAGE_REPORT_SUCCESS]: coverageReportSuccessReducer,
  [COVERAGE_REPORT_FAIL]: coverageReportFailReducer,
  [MISSED_CALL_REPORT_START]: missedCallReportStartReducer,
  [MISSED_CALL_REPORT_SUCCESS]: missedCallReportSuccessReducer,
  [MISSED_CALL_REPORT_FAIL]: missedCallReportFailReducer,
});
