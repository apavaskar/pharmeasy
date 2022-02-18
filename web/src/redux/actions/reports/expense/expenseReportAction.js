import { CONSOLIDATED_REPORT_FAIL, CONSOLIDATED_REPORT_START, CONSOLIDATED_REPORT_SUCCESS } from "./expenseReportActionConstants"

export const cosolidatedReportStart = payload => dispatch => {
    dispatch({
        type: CONSOLIDATED_REPORT_START,
        payload: payload
    })
}

export const cosolidatedReportSuccess = payload => dispatch => {
    dispatch({
        type: CONSOLIDATED_REPORT_SUCCESS,
        payload: payload
    })
}

export const cosolidatedReportFail = payload => dispatch => {
    dispatch({
        type: CONSOLIDATED_REPORT_FAIL,
        payload: payload
    })
}