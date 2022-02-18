import {ofType} from "redux-observable";
import {catchError, debounceTime, filter, forkJoin, map, of, retry, switchMap} from "rxjs";
import {hideSpinner, showSpinner} from "../actions/widgets/widgetActions";
import {APPROVE_EXPENSE_START, MIS_APPROVAL_DETAIL_START, MIS_SEARCH_APPROVAL_FAIL, MIS_SEARCH_APPROVAL_START, MIS_SEARCH_APPROVAL_SUCCESS, ROUTE_EMPLOYEE_DATE_START} from "../actions/expense/misExpenseActionConstants";
import {approveExpenseRequest, expenseActivitiesForMonthYear, expenseDocumentCountForMonthYear, routesForEmployeeAndDateRequest, searchMisExpenseApprovalRequest} from "../../api/expenseAPI";
import {
    approvalDetailSearchFailAction,
    approvalDetailSearchSuccessAction,
    approveExpensesFailAction,
    approveExpensesSuccessAction,
    misApprovalSearchFailAction,
    misApprovalSearchSuccessAction,
    routeForEmployeeAndDateFailAction,
    routeForEmployeeAndDateSuccessAction
} from "../actions/expense/misExpenseActions";
import { systemLovByType} from "../../api/commonApi";
import {routesForEmployeeAndDateApi} from "../../api/apiConstants";
import {employeeProfileRequest, userProfileRequest} from "../../api/userProfileApi";

export const showMisExpenseLoaderEpic = action$ =>
    action$.pipe(
        filter(
            action =>
                action.type === MIS_SEARCH_APPROVAL_START
        ),
        map(showSpinner),
    )

export const hideMisExpenseLoaderEpic = action$ =>
    action$.pipe(
        filter(
            action =>
                action.type === MIS_SEARCH_APPROVAL_FAIL ||
                action.type === MIS_SEARCH_APPROVAL_SUCCESS
         ),
        map(hideSpinner),
    );

export const searchMisApprovalEpic = (action$) =>
    action$.pipe(
        ofType(MIS_SEARCH_APPROVAL_START),
        debounceTime(4000),
        switchMap(action =>
            searchMisExpenseApprovalRequest(action.payload).pipe(
               map(response =>
                   misApprovalSearchSuccessAction({data: response.response}),
                   catchError((error) =>
                            of(misApprovalSearchFailAction({title: 'Expense',
                                message: 'Failed to load the page. Please try again.', error: error}))))
        )));

export const searchApprovalDetailEpic = (action$) =>
    action$.pipe(
        ofType(MIS_APPROVAL_DETAIL_START),
        switchMap(action =>
            forkJoin(expenseActivitiesForMonthYear(action.payload),
                expenseDocumentCountForMonthYear(action.payload),
                systemLovByType({...action.payload, type: 'EXPENSE_LOCATION_TYPE'}),
                employeeProfileRequest(action.payload)
                ).pipe(
                map(responses => {
                        console.log(responses);
                        return approvalDetailSearchSuccessAction({data: responses[0].response,
                            documentCounts: responses[1].response,
                            locationTypes: responses[2].response,
                            profile: responses[3].response
                            });},
                    catchError((error) =>
                        of(approvalDetailSearchFailAction({title: 'Expense',
                            message: 'Failed to load the page. Please try again.', error: error}))))
            )));

export const approveExpenseEpic = (action$) =>
    action$.pipe(
    ofType(APPROVE_EXPENSE_START),
    switchMap(action =>
        approveExpenseRequest(action.payload).pipe(
            map(responses =>
                    approveExpensesSuccessAction({data: responses.response, payload: action.payload}),
                catchError((error) =>
                    of(approveExpensesFailAction({title: 'Expense',
                        message: 'Failed to load the page. Please try again.', error: error}))))
        )));

export const routesForEmployeeDateEpic = (action$) =>
    action$.pipe(
        ofType(ROUTE_EMPLOYEE_DATE_START),
        switchMap(action =>
            routesForEmployeeAndDateRequest(action.payload).pipe(
                map(responses =>
                        routeForEmployeeAndDateSuccessAction({data: responses.response}),
                    catchError((error) =>
                        of(routeForEmployeeAndDateFailAction({title: 'Expense',
                            message: 'Failed to load the page. Please try again.', error: error}))))
            )));
