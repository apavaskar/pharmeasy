import {ofType} from 'redux-observable';
import {catchError, map, switchMap} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {
  ADD_UNPLANNED_DOCTORS_START,
  ADD_UNPLANNED_NCA_START,
  CALL_INIT_DOCTOR_LIST_START,
  CALL_INIT_NCA_LIST_START,
  CALL_SET_CALL_TYPE_LIST_START,
  ZSM_CALL_CONFIRM_START,
} from '../../actions/callReporting/callReportingActionConstants';
import {
  addUnplannedDoctorFailAction,
  addUnplannedDoctorSuccessAction,
  addUnplannedNCAFailAction,
  addUnplannedNCASuccessAction,
  callInitDoctorListFailAction,
  callInitDoctorListSuccessAction,
  callInitNCAListFailAction,
  callInitNCAListSuccessAction,
  callTypeListToReportFailAction,
  callTypeListToReportSuccessAction,
  zsmCallConfirmFailAction,
  zsmCallConfirmSuccessAction,
} from '../../actions/callReporting/callReportingListAction';
import {
  addUnplannedDoctors,
  addUnplannedNonCallActivities,
  getPlannedDoctorsForDateAndLocation,
  getPlannedNCAForDateAndLocation,
} from '../../../db/callReporting/callReportingListDbService';
import {updatePlanForZsm} from '../../../db/PlanDbService';

export const callReportingListChangeTypeEpic = action$ => {
  return action$.pipe(
    ofType(CALL_SET_CALL_TYPE_LIST_START),
    map(action => {
      return callTypeListToReportSuccessAction({
        reportingDate: action.payload.reportingDate,
        currentAction: action.payload.currentAction,
      });
    }),
    catchError(error => of(callTypeListToReportFailAction({error: error}))),
  );
};

export const doctorsToReportListEpic = action$ => {
  return action$.pipe(
    ofType(CALL_INIT_DOCTOR_LIST_START),
    switchMap(action =>
      from(
        getPlannedDoctorsForDateAndLocation(
          action.payload.reportingDate,
          action.payload.locationId,
        ),
      ).pipe(map(data => callInitDoctorListSuccessAction({doctorList: data}))),
    ),
    catchError(error => of(callInitDoctorListFailAction({error: error}))),
  );
};

export const ncaToReportListEpic = action$ => {
  return action$.pipe(
    ofType(CALL_INIT_NCA_LIST_START),
    switchMap(action =>
      from(
        getPlannedNCAForDateAndLocation(
          action.payload.reportingDate,
          action.payload.locationId,
        ),
      ).pipe(
        map(data => callInitNCAListSuccessAction({nonCallActivityList: data})),
      ),
    ),
    catchError(error => of(callInitNCAListFailAction({error: error}))),
  );
};

export const addUnplannedDoctorEpic = action$ => {
  return action$.pipe(
    ofType(ADD_UNPLANNED_DOCTORS_START),
    switchMap(action =>
      from(
        addUnplannedDoctors(
          action.payload.doctors,
          action.payload.date,
          action.payload.locationId,
          action.payload.employeeId,
        ),
      ).pipe(
        map(activities =>
          addUnplannedDoctorSuccessAction({doctorList: activities}),
        ),
        catchError(error => of(addUnplannedDoctorFailAction({error: error}))),
      ),
    ),
  );
};

export const addUnplannedNCAEpic = action$ => {
  return action$.pipe(
    ofType(ADD_UNPLANNED_NCA_START),
    switchMap(action =>
      from(
        addUnplannedNonCallActivities(
          action.payload.reportingDate,
          action.payload.locationId,
          action.payload.activities,
        ),
      ).pipe(
        map(activities =>
          addUnplannedNCASuccessAction({activities: activities}),
        ),
        catchError(error => of(addUnplannedNCAFailAction({error: error}))),
      ),
    ),
  );
};

export const zsmConfirmCallEpic = action$ => {
  return action$.pipe(
    ofType(ZSM_CALL_CONFIRM_START),
    switchMap(action =>
      from(updatePlanForZsm(action.payload.id, action.payload.confirm)).pipe(
        switchMap(done =>
          from(
            getPlannedDoctorsForDateAndLocation(
              action.payload.reportingDate,
              action.payload.locationId,
            ),
          ).pipe(
            map(visits => zsmCallConfirmSuccessAction({doctorList: visits})),
            catchError(error => of(zsmCallConfirmFailAction({error: error}))),
          ),
        ),
      ),
    ),
  );
};
