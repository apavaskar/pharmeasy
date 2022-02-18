import {ofType} from "redux-observable";
import {catchError, debounceTime, filter, map, of, retry, switchMap} from "rxjs";
import {
    EXPAND_EFFORT_REPORT_FAIL,
    EXPAND_EFFORT_REPORT_START,
    EXPAND_EFFORT_REPORT_SUCCESS,
    FETCH_DAILY_EFFORT_REPORT_FAIL,
    FETCH_DAILY_EFFORT_REPORT_START,
    FETCH_DAILY_EFFORT_REPORT_SUCCESS,
    FETCH_DEVIATION_VISIT_REPORT_START,
    FETCH_DOCTOR_VISIT_REPORT_FAIL,
    FETCH_DOCTOR_VISIT_REPORT_START,
    FETCH_DOCTOR_VISIT_REPORT_SUCCESS,
    FETCH_EFFORT_REPORT_FAIL,
    FETCH_EFFORT_REPORT_START,
    FETCH_EFFORT_REPORT_SUCCESS
} from "../actions/reports/effort/effortReportActionConstants";
import {dailyEffortRequest, deviationVisitRequest, doctorVisitRequest, effortRequest} from "../../api/reportsApi";
import {
    expandEffortReportSuccessAction,
    fetchDailyEffortReportSuccessAction,
    fetchDeviationReportFailAction,
    fetchDeviationReportSuccessAction,
    fetchDoctorVisitReportFailAction,
    fetchDoctorVisitReportSuccessAction,
    fetchEffortReportFailAction,
    fetchEffortReportSuccessAction
} from "../actions/reports/effort/effortReportAction";
import { hideSpinner, showSpinner } from "../actions/widgets/widgetActions";
import { doctorVisitReportAPI } from "../../api/apiConstants";

export const showEffortReportLoaderEpic = action$ =>
    action$.pipe(
        filter(
            action =>
                action.type === FETCH_EFFORT_REPORT_START ||
                action.type === EXPAND_EFFORT_REPORT_START ||
                action.type === FETCH_DAILY_EFFORT_REPORT_START||
                action.type === FETCH_DOCTOR_VISIT_REPORT_START
        ),
        map(showSpinner),
    )

export const hideEffortReportLoaderEpic = action$ =>
    action$.pipe(
        filter(
            action =>
                action.type === FETCH_EFFORT_REPORT_SUCCESS ||
                action.type === FETCH_EFFORT_REPORT_FAIL ||
                action.type === EXPAND_EFFORT_REPORT_SUCCESS ||
                action.type === EXPAND_EFFORT_REPORT_FAIL ||
                action.type === FETCH_DAILY_EFFORT_REPORT_SUCCESS ||
                action.type === FETCH_DAILY_EFFORT_REPORT_FAIL||
                action.type === FETCH_DOCTOR_VISIT_REPORT_SUCCESS ||
                action.type === FETCH_DOCTOR_VISIT_REPORT_FAIL
        ),
        map(hideSpinner),
    );

export const fetchEffortReportStartEpic = (action$) =>
    action$.pipe(
        ofType(FETCH_EFFORT_REPORT_START),
        debounceTime(500),
        switchMap(action =>
            effortRequest(action.payload).pipe(
                retry(1),
                map(data =>
                    fetchEffortReportSuccessAction({effortData: data.response})),
                catchError((error) => of(fetchEffortReportFailAction({error: error}))),
            )),
        catchError((error) => of(fetchEffortReportFailAction({error: error})))
    );

export const expandEffortReportStartEpic = (action$) =>
    action$.pipe(
        ofType(EXPAND_EFFORT_REPORT_START),
        debounceTime(500),
        switchMap(action =>
            effortRequest(action.payload).pipe(
                retry(1),
                map(data =>
                    expandEffortReportSuccessAction({effortData: data.response, parentLocation: action.payload.locationId})),
                catchError((error) => of(expandEffortReportSuccessAction({error: error}))),
            )),
        catchError((error) => of(expandEffortReportSuccessAction({error: error})))
    );

export const fetchDailyEffortReportStartEpic = (action$) =>
    action$.pipe(
        ofType(FETCH_DAILY_EFFORT_REPORT_START),
        debounceTime(500),
        switchMap(action =>
            dailyEffortRequest(action.payload).pipe(
                retry(1),
                map(data =>
                    fetchDailyEffortReportSuccessAction({dailyEffortData: data.response})),
                catchError((error) => of(fetchEffortReportFailAction({error: error}))),
            )),
        catchError((error) => of(fetchEffortReportFailAction({error: error})))
    );

    export const fetchDoctorVisitReportStartEpic = (action$) =>
        action$.pipe(
            ofType(FETCH_DOCTOR_VISIT_REPORT_START),
            debounceTime(500),
            switchMap(action =>
                doctorVisitRequest(action.payload).pipe(
                    retry(1),
                    map(data =>
                        fetchDoctorVisitReportSuccessAction({doctorVisitData: data.response})),
                    catchError((error) => of(fetchDoctorVisitReportFailAction({error: error}))),
            )),
        catchError((error) => of(fetchDoctorVisitReportFailAction({error: error})))
    );

    export const fetchDeviationReportStartEpic = (action$) =>
        action$.pipe(
            ofType(FETCH_DEVIATION_VISIT_REPORT_START),
            debounceTime(500),
            switchMap(action =>
                deviationVisitRequest(action.payload).pipe(
                    retry(1),
                    map(data =>
                        fetchDeviationReportSuccessAction({deviationReport: data.response})),
                    catchError((error) => of(fetchDeviationReportFailAction({error: error}))),
            )),
        catchError((error) => of(fetchDeviationReportFailAction({error: error})))
    );
