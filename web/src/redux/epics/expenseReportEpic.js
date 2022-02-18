import {ofType} from "redux-observable";
import {catchError, debounceTime, filter, map, of, retry, switchMap} from "rxjs";
import { expenseConsolidatedAPI } from "../../api/apiConstants";
import { expenseConsolidatedRequest } from "../../api/reportsApi";
import { fetchDailyEffortReportFailAction } from "../actions/reports/effort/effortReportAction";
import { cosolidatedReportFail, cosolidatedReportSuccess } from "../actions/reports/expense/expenseReportAction";
import { CONSOLIDATED_REPORT_FAIL, CONSOLIDATED_REPORT_START, CONSOLIDATED_REPORT_SUCCESS } from "../actions/reports/expense/expenseReportActionConstants";
import { hideSpinner, showSpinner } from "../actions/widgets/widgetActions";

export const showConsolidatedReportLoaderEpic = action$ => 
    action$.pipe(
        filter(
            action =>
                action.type === CONSOLIDATED_REPORT_START,
        ),
        map(showSpinner),
    )

    
export const hideConsolidatedReportLoaderEpic = action$ => 
    action$.pipe(
        filter(
            action =>
            action.type === CONSOLIDATED_REPORT_SUCCESS ||
            action.type === CONSOLIDATED_REPORT_FAIL,
        ),
        map(hideSpinner),
    )


export const fetchConsolidatedReportStartEpic = (action$) => 
        action$.pipe(
            ofType(CONSOLIDATED_REPORT_START),
            debounceTime(500),
            switchMap(action =>
                expenseConsolidatedRequest(action.payload).pipe(
                    retry(1),
                    map(data =>
                        cosolidatedReportSuccess({consolidatedReport: data.response})),
                        catchError((error) => of(cosolidatedReportFail))
                    )),
                catchError((error) => of(fetchDailyEffortReportFailAction({error: error})))
         )    
        