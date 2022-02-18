import {ofType} from "redux-observable";
import {catchError, debounceTime, filter, map, of, retry, switchMap} from "rxjs";
import {EXPAND_EFFORT_REPORT_START, FETCH_EFFORT_REPORT_START} from "../actions/reports/effort/effortReportActionConstants";
import {dmlReportRequest, effortRequest} from "../../api/reportsApi";
import {fetchEffortReportFailAction, fetchEffortReportSuccessAction} from "../actions/reports/effort/effortReportAction";
import {hideSpinner, showSpinner} from "../actions/widgets/widgetActions";
import {FETCH_DML_REPORT_FAIL, FETCH_DML_REPORT_START, FETCH_DML_REPORT_SUCCESS} from "../actions/reports/customer/customerReportActionConstants";
import {fetchDmlReportFailAction, fetchDmlReportStartAction, fetchDmlReportSuccessAction} from "../actions/reports/customer/customerReportAction";

export const showCustomerReportLoaderEpic = action$ =>
    action$.pipe(
        filter(
            action =>
                action.type === FETCH_DML_REPORT_START,
        ),
        map(showSpinner),
    )

export const hideCustomerReportLoaderEpic = action$ =>
    action$.pipe(
        filter(
            action =>
            action.type === FETCH_DML_REPORT_SUCCESS ||
            action.type === FETCH_DML_REPORT_FAIL,
        ),
        map(hideSpinner),
    )

export const fetchDMLReportStartEpic = (action$) =>
    action$.pipe(
        ofType(FETCH_DML_REPORT_START),
        debounceTime(500),
        switchMap(action =>
            dmlReportRequest(action.payload).pipe(
                retry(1),
                map(data =>
                    fetchDmlReportSuccessAction({dmlData: data.response})),
                catchError((error) => of(fetchDmlReportFailAction({error: error}))),
            )),
        catchError((error) => of(fetchDmlReportFailAction({error: error})))
    );
