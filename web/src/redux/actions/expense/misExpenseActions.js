import {
    APPROVE_EXPENSE_FAIL,
    APPROVE_EXPENSE_START,
    APPROVE_EXPENSE_SUCCESS,
    MIS_APPROVAL_DETAIL_FAIL,
    MIS_APPROVAL_DETAIL_START,
    MIS_APPROVAL_DETAIL_SUCCESS,
    MIS_SEARCH_APPROVAL_FAIL,
    MIS_SEARCH_APPROVAL_START,
    MIS_SEARCH_APPROVAL_SUCCESS, RESET_EXPENSE_APPROVAL, ROUTE_EMPLOYEE_DATE_FAIL, ROUTE_EMPLOYEE_DATE_START,
    ROUTE_EMPLOYEE_DATE_SUCCESS
} from "./misExpenseActionConstants";

export const misApprovalSearchStartAction = payload => dispatch => {
    dispatch({
        type: MIS_SEARCH_APPROVAL_START,
        payload: payload,
    });
};

export const misApprovalSearchSuccessAction = payload => dispatch => {
    dispatch({
        type: MIS_SEARCH_APPROVAL_SUCCESS,
        payload: payload,
    });
};

export const misApprovalSearchFailAction = payload => dispatch => {
    dispatch({
        type: MIS_SEARCH_APPROVAL_FAIL,
        payload: payload,
    });
};

export const approvalDetailSearchStartAction = payload => dispatch => {
    dispatch({
        type: MIS_APPROVAL_DETAIL_START,
        payload: payload,
    });
};

export const approvalDetailSearchSuccessAction = payload => dispatch => {
    dispatch({
        type: MIS_APPROVAL_DETAIL_SUCCESS,
        payload: payload,
    });
};

export const approvalDetailSearchFailAction = payload => dispatch => {
    dispatch({
        type: MIS_APPROVAL_DETAIL_FAIL,
        payload: payload,
    });
};

export const approveExpensesStartAction = payload => dispatch =>
{
    dispatch({
        type: APPROVE_EXPENSE_START,
        payload: payload,
    });
};

export const approveExpensesSuccessAction = payload => dispatch => {
    dispatch({
        type: APPROVE_EXPENSE_SUCCESS,
        payload: payload,
    });
};

export const approveExpensesFailAction = payload => dispatch => {
    console.log(payload);
    dispatch({
        type: APPROVE_EXPENSE_FAIL,
        payload: payload,
    });
};

export const routeForEmployeeAndDateStartAction = payload => dispatch =>
{
    dispatch({
        type: ROUTE_EMPLOYEE_DATE_START,
        payload: payload,
    });
}
;

export const routeForEmployeeAndDateSuccessAction = payload => dispatch => {
    dispatch({
        type: ROUTE_EMPLOYEE_DATE_SUCCESS,
        payload: payload,
    });
};

export const routeForEmployeeAndDateFailAction = payload => dispatch => {
    dispatch({
        type: ROUTE_EMPLOYEE_DATE_FAIL,
        payload: payload,
    });
};

export const resetExpenseApprovalAction = payload => dispatch => {
    dispatch({
        type: RESET_EXPENSE_APPROVAL,
        payload: payload,
    });
};
