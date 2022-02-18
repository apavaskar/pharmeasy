import {FETCH_DML_REPORT_FAIL, FETCH_DML_REPORT_START, FETCH_DML_REPORT_SUCCESS, INIT_DML_REPORT_FAIL, INIT_DML_REPORT_START, INIT_DML_REPORT_SUCCESS} from "./customerReportActionConstants";

export const initDmlReportStartAction = payload => dispatch =>
{
    dispatch({
        type: INIT_DML_REPORT_START,
        payload: payload,
    });
}
;

export const initDmlReportSuccessAction = payload => dispatch => {
    dispatch({
        type: INIT_DML_REPORT_SUCCESS,
        payload: payload,
    });
};

export const initDmlReportFailAction = payload => dispatch => {
    dispatch({
        type: INIT_DML_REPORT_FAIL,
        payload: payload,
    });
};

export const fetchDmlReportStartAction = payload => dispatch =>
    {
        dispatch({
            type: FETCH_DML_REPORT_START,
            payload: payload,
        });
    }
;

export const fetchDmlReportSuccessAction = payload => dispatch => {
    dispatch({
        type: FETCH_DML_REPORT_SUCCESS,
        payload: payload,
    });
};

export const fetchDmlReportFailAction = payload => dispatch => {
    dispatch({
        type: FETCH_DML_REPORT_FAIL,
        payload: payload,
    });
};
