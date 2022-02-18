import {ofType} from 'redux-observable';
import {
  HOSPITAL_DAILY_DASHBOARD_START,
  HOSPITAL_DAILY_DETAILS_START,
  HOSPITAL_MONTHLY_DASHBOARD_START,
  HOSPITAL_MONTHLY_DETAILS_START,
} from '../actions/actionConstants';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {
  hospitalDailyDashboardFailAction,
  hospitalDailyDashboardSuccessAction,
  hospitalMonthlyDashboardFailAction,
  hospitalMonthlyDashboardSuccessAction,
} from '../actions/dashboardAction';
import {forkJoin, from, of} from 'rxjs';
import {
  getDailyHospitalVisitsSummary,
  getMonthlyHospitalSummary,
} from '../../api/dashboardApi';
import {
  getDailyVisitsForHospital,
  getMonthlyVisitsForHospital,
} from '../../api/hospitalAPI';
import {
  hospitalDailyDetailFailAction,
  hospitalDailyDetailSuccessAction,
  hospitalMonthlyDetailFailAction,
  hospitalMonthlyDetailSuccessAction,
} from '../actions/hospitalAction';
import {LOAD_CALL_DASHBOARD_START} from '../actions/dashboard/dashboardActionConstant';
import {loadCallVisits} from '../../db/callReporting/callDbService';
import {
  loadCallDashboardFailAction,
  loadCallDashboardSuccessAction,
} from '../actions/dashboard/dashboardAction';

export const hospitalDailyDashboardEpic = action$ => {
  return action$.pipe(
    ofType(HOSPITAL_DAILY_DASHBOARD_START),
    switchMap(action =>
      getDailyHospitalVisitsSummary(
        action.payload.locationId,
        action.payload.yearMonth,
        action.payload.certificate,
        action.payload.drilldown,
      ).pipe(
        map(data => {
          return hospitalDailyDashboardSuccessAction({
            dailyHospitalSummary: data.response,
            drilldown: action.payload.drilldown,
            yearMonth: action.payload.yearMonth,
            locationId: action.payload.locationId,
          });
        }),
        catchError(error =>
          of(hospitalDailyDashboardFailAction({error: error})),
        ),
      ),
    ),
  );
};

export const hospitalDailyDetailDashboardEpic = action$ => {
  return action$.pipe(
    ofType(HOSPITAL_DAILY_DETAILS_START),
    switchMap(action =>
      getDailyVisitsForHospital(
        action.payload.locationId,
        action.payload.yearMonth,
        action.payload.certificate,
      ).pipe(
        map(data => {
          return hospitalDailyDetailSuccessAction({
            dailyHospitalDetails: data.response,
            locationId: action.payload.locationId,
            yearMonth: action.payload.yearMonth,
          });
        }),
        catchError(error => of(hospitalDailyDetailFailAction({error: error}))),
      ),
    ),
  );
};

export const hospitalMonthlyDashboardEpic = action$ => {
  return action$.pipe(
    ofType(HOSPITAL_MONTHLY_DASHBOARD_START),
    switchMap(action =>
      getMonthlyHospitalSummary(
        action.payload.locationId,
        action.payload.yearMonth,
        action.payload.certificate,
        action.payload.drilldown,
      ).pipe(
        map(data => {
          return hospitalMonthlyDashboardSuccessAction({
            monthlyHospitalSummary: data.response,
            drilldown: action.payload.drilldown,
            yearMonth: action.payload.yearMonth,
            locationId: action.payload.locationId,
          });
        }),
        catchError(error =>
          of(hospitalMonthlyDashboardFailAction({error: error})),
        ),
      ),
    ),
  );
};

export const hospitalMonthlyDetailDashboardEpic = action$ => {
  return action$.pipe(
    ofType(HOSPITAL_MONTHLY_DETAILS_START),
    switchMap(action =>
      getMonthlyVisitsForHospital(
        action.payload.locationId,
        action.payload.yearMonth,
        action.payload.certificate,
      ).pipe(
        map(data => {
          return hospitalMonthlyDetailSuccessAction({
            monthlyHospitalDetails: data.response,
            locationId: action.payload.locationId,
            yearMonth: action.payload.yearMonth,
          });
        }),
        catchError(error =>
          of(hospitalMonthlyDetailFailAction({error: error})),
        ),
      ),
    ),
  );
};

export const loadCallDashboardEpic = action$ => {
  return action$.pipe(
    ofType(LOAD_CALL_DASHBOARD_START),
    switchMap(action =>
      from(loadCallVisits()).pipe(
        map(data => {
          return loadCallDashboardSuccessAction({
            data: data,
          });
        }),
        catchError(error => of(loadCallDashboardFailAction({error: error}))),
      ),
    ),
  );
};
