import {
  COVERAGE_REPORT_FAIL,
  COVERAGE_REPORT_START,
  COVERAGE_REPORT_SUCCESS,
  MISSED_CALL_REPORT_FAIL,
  MISSED_CALL_REPORT_START,
  MISSED_CALL_REPORT_SUCCESS,
} from './effortReportActionConstant';

export const coverageReportStartAction = payload => dispatch => {
  dispatch({
    type: COVERAGE_REPORT_START,
    payload: payload,
  });
};

export const coverageReportSuccessAction = payload => dispatch => {
  dispatch({
    type: COVERAGE_REPORT_SUCCESS,
    payload: payload,
  });
};

export const coverageReportFailAction = payload => dispatch => {
  dispatch({
    type: COVERAGE_REPORT_FAIL,
    payload: payload,
  });
};

export const missedCallReportStartAction = payload => dispatch => {
  dispatch({
    type: MISSED_CALL_REPORT_START,
    payload: payload,
  });
};

export const missedCallReportSuccessAction = payload => dispatch => {
  dispatch({
    type: MISSED_CALL_REPORT_SUCCESS,
    payload: payload,
  });
};

export const missedCallReportFailAction = payload => dispatch => {
  dispatch({
    type: MISSED_CALL_REPORT_FAIL,
    payload: payload,
  });
};
