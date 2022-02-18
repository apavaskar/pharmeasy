import {
    EXPAND_EFFORT_REPORT_FAIL,
    EXPAND_EFFORT_REPORT_START,
    EXPAND_EFFORT_REPORT_SUCCESS,
    FETCH_DAILY_EFFORT_REPORT_FAIL,
    FETCH_DAILY_EFFORT_REPORT_START,
    FETCH_DAILY_EFFORT_REPORT_SUCCESS, FETCH_DEVIATION_VISIT_REPORT_FAIL,
    FETCH_DEVIATION_VISIT_REPORT_START, FETCH_DEVIATION_VISIT_REPORT_SUCCESS,
    FETCH_DOCTOR_VISIT_REPORT_FAIL,
    FETCH_DOCTOR_VISIT_REPORT_START,
    FETCH_DOCTOR_VISIT_REPORT_SUCCESS,
    FETCH_EFFORT_REPORT_FAIL,
    FETCH_EFFORT_REPORT_START,
    FETCH_EFFORT_REPORT_SUCCESS,
    INIT_EFFORT_REPORT_START,
    INIT_EFFORT_REPORT_SUCCESS
} from "./effortReportActionConstants";

export const initEffortReportStartAction = payload => dispatch => {
    dispatch({
        type: INIT_EFFORT_REPORT_START,
        payload: payload,
    });
};

export const initEffortReportSuccessAction = payload => dispatch => {
    dispatch({
        type: INIT_EFFORT_REPORT_SUCCESS,
        payload: payload,
    });
};

export const fetchEffortReportStartAction = payload => dispatch => {
    dispatch({
        type: FETCH_EFFORT_REPORT_START,
        payload: payload,
    });
};

export const fetchEffortReportSuccessAction = payload => dispatch => {
    dispatch({
        type: FETCH_EFFORT_REPORT_SUCCESS,
        payload: payload,
    });
};

export const fetchEffortReportFailAction = payload => dispatch => {
    dispatch({
        type: FETCH_EFFORT_REPORT_FAIL,
        payload: payload,
    });
};

export const expandEffortReportStartAction = payload => dispatch => {
    dispatch({
        type: EXPAND_EFFORT_REPORT_START,
        payload: payload,
    });
};

export const expandEffortReportSuccessAction = payload => dispatch => {
    dispatch({
        type: EXPAND_EFFORT_REPORT_SUCCESS,
        payload: payload,
    });
};

export const expandEffortReportFailAction = payload => dispatch => {
    dispatch({
        type: EXPAND_EFFORT_REPORT_FAIL,
        payload: payload,
    });
};

export const fetchDailyEffortReportStartAction = payload => dispatch => {
    dispatch({
        type: FETCH_DAILY_EFFORT_REPORT_START,
        payload: payload,
    });
};

export const fetchDailyEffortReportSuccessAction = payload => dispatch => {
    dispatch({
        type: FETCH_DAILY_EFFORT_REPORT_SUCCESS,
        payload: payload,
    });
};

export const fetchDailyEffortReportFailAction = payload => dispatch => {
    dispatch({
        type: FETCH_DAILY_EFFORT_REPORT_FAIL,
        payload: payload,
    });
};

export const fetchDoctorVisitReportStartAction = payload => dispatch => {
    dispatch({
        type: FETCH_DOCTOR_VISIT_REPORT_START,
        payload: payload,
    });
};

export const fetchDoctorVisitReportSuccessAction = payload => dispatch => {
    dispatch({
        type: FETCH_DOCTOR_VISIT_REPORT_SUCCESS,
        payload: payload,
    });
};

export const fetchDoctorVisitReportFailAction = payload => dispatch => {
    dispatch({
        type: FETCH_DOCTOR_VISIT_REPORT_FAIL,
        payload: payload,
    });
};

export const fetchDeviationReportStartAction = payload => dispatch => {
    dispatch({
        type: FETCH_DEVIATION_VISIT_REPORT_START,
        payload: payload,
    });
};

export const fetchDeviationReportSuccessAction = payload => dispatch => {
    dispatch({
        type: FETCH_DEVIATION_VISIT_REPORT_SUCCESS,
        payload: payload,
    });
};

export const fetchDeviationReportFailAction = payload => dispatch => {
    dispatch({
        type: FETCH_DEVIATION_VISIT_REPORT_FAIL,
        payload: payload,
    });
};
