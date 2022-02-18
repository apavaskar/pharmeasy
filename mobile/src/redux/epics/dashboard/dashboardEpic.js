import {ofType} from 'redux-observable';
import {catchError, map, switchMap} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {
  INIT_DASHBOARD_START_ACTION,
  LOAD_CRM_DASHBOARD_START,
  LOAD_NOTIFICATIONS_START,
} from '../../actions/dashboard/dashboardActionConstant';
import {loadSystemConfigs} from '../../../db/CommonDbService';
import {
  hospitalDailyDashboardFailAction,
  hospitalDailyDashboardSuccessAction,
  hospitalMonthlyDashboardFailAction,
  hospitalMonthlyDashboardSuccessAction,
  initDashboardFailAction,
  initDashboardSuccessAction,
  loadCRMDashboardFailAction,
  loadCRMDashboardSuccessAction,
  loadNotificationsFailAction,
  loadNotificationsSuccessAction,
} from '../../actions/dashboard/dashboardAction';
import {
  HOSPITAL_DAILY_DASHBOARD_START,
  HOSPITAL_DAILY_DETAILS_START,
  HOSPITAL_MONTHLY_DASHBOARD_START,
  HOSPITAL_MONTHLY_DETAILS_START,
} from '../../actions/actionConstants';
import {
  getDailyHospitalVisitsSummary,
  getMonthlyHospitalSummary,
  getNotifications,
} from '../../../api/dashboardApi';
import {
  getDailyVisitsForHospital,
  getMonthlyVisitsForHospital,
} from '../../../api/hospitalAPI';
import {
  hospitalDailyDetailFailAction,
  hospitalDailyDetailSuccessAction,
  hospitalMonthlyDetailFailAction,
  hospitalMonthlyDetailSuccessAction,
} from '../../actions/hospitalAction';
import {INIT_VISIT_COMMENTS_START} from '../../actions/callReporting/callReportingActionConstants';
import {loadAllStages} from '../../../db/crm/crmstageDbService';
import {
  initVisitCommentsFailAction,
  initVisitCommentsSuccessAction,
} from '../../actions/callReporting/callReportingAction';
import {getCRMDashboard} from '../../../api/crmApi';

export const initDashboardEpic = action$ => {
  return action$.pipe(
    ofType(INIT_DASHBOARD_START_ACTION),
    switchMap(action =>
      from(loadSystemConfigs()).pipe(
        map(data => initDashboardSuccessAction({configs: data})),
        catchError(error => of(initDashboardFailAction({error: error}))),
      ),
    ),
  );
};

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

export const notificationsDashboardEpic = action$ => {
  return action$.pipe(
    ofType(LOAD_NOTIFICATIONS_START),
    switchMap(action =>
      getNotifications(action.payload.certificate).pipe(
        map(data => {
          return loadNotificationsSuccessAction({
            notifications: data.response,
          });
        }),
        catchError(error => of(loadNotificationsFailAction({error: error}))),
      ),
    ),
  );
};

export const initCRMDashboardEpic = action$ => {
  return action$.pipe(
    ofType(LOAD_CRM_DASHBOARD_START),
    switchMap(action =>
      from(getCRMDashboard(action.payload)).pipe(
        map(stages => loadCRMDashboardSuccessAction({stages: stages.response})),
        catchError(error => of(loadCRMDashboardFailAction({error: error}))),
      ),
    ),
  );
};
