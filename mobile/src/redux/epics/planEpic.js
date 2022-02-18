import {
  ADD_BEATS_TO_PLAN_START_ACTION,
  ADD_DOCTORS_TO_PLAN_START_ACTION,
  CHANGE_PLAN_TYPE_START_ACTION,
  FETCH_PLAN_SUMMARY_START,
  INIT_MANAGER_PLAN_TO_LOCAL_START,
  INIT_NON_CALL_START,
  INIT_PLAN_START_ACTION,
  REMOVE_DOCTOR_FROM_PLAN_START,
  RESET_TOUR_PLAN_START,
  SAVE_DOCTOR_TO_PLAN_FAIL,
  SAVE_DOCTOR_TO_PLAN_START,
  SAVE_DOCTOR_TO_PLAN_SUCCESS,
  SAVE_MANAGER_PLAN_TO_LOCAL_START,
  SAVE_NON_CALL_TO_PLAN_START,
} from '../actions/actionConstants';
import {ofType} from 'redux-observable';
import {catchError, filter, map, switchMap} from 'rxjs/operators';
import {
  addBeatsToPlanFailAction,
  addBeatsToPlanSuccessAction,
  changePlanTypeFailAction,
  changePlanTypeSuccessAction,
  fetchPlanSummaryFailAction,
  fetchPlanSummarySuccessAction,
  initManagerPlanFailAction,
  initManagerPlanSuccessAction,
  initNonCallFailAction,
  initNonCallSuccessAction,
  initPlanFailAction,
  initPlanSuccessAction,
  removeDoctorFromPlanFailAction,
  removeDoctorFromPlanSuccessAction,
  resetPlanFailAction,
  resetPlanSuccessAction,
  saveDoctorsToPlanFailAction,
  saveDoctorsToPlanSuccessAction,
  saveManagerDoctorToLocalFailAction,
  saveManagerDoctorToLocalSuccessAction,
  saveNonCallActivitiesFailAction,
  saveNonCallActivitiesSuccessAction,
} from '../actions/planAction';
import {forkJoin, from, of} from 'rxjs';
import {
  addUnplannedDoctors,
  getManagerDoctorLocation,
  getPlanForDateAndLocation,
  getPlanSummaryForYearMonthAndLocation,
  loadAllNoncallActivities,
  loadNonCallActivitiesForDate,
  saveManagerDoctors,
  saveNonCallActivities,
  savePlanForDateAndLocation,
} from '../../db/PlanDbService';
import {loadDoctorsForBeats} from '../../db/CommonDbService';
import {getBeatsPlanned} from '../../db/ManagerDbService';
import {hideSpinner, showSpinner} from '../actions/globalActions';

export const planShowSpinnerEpic = action$ =>
  action$.pipe(
    filter(action => action.type === SAVE_DOCTOR_TO_PLAN_START),
    map(showSpinner),
  );

export const planHideSpinnerEpic = action$ =>
  action$.pipe(
    filter(
      action =>
        action.type === SAVE_DOCTOR_TO_PLAN_FAIL ||
        action.type === SAVE_DOCTOR_TO_PLAN_SUCCESS,
    ),
    map(hideSpinner),
  );

export const initPlanEpic = action$ => {
  return action$.pipe(
    ofType(INIT_PLAN_START_ACTION),
    switchMap(action =>
      forkJoin(
        getPlanForDateAndLocation(
          action.payload.planDate,
          action.payload.locationId,
        ),
        loadNonCallActivitiesForDate(
          action.payload.planDate,
          action.payload.locationId,
        ),
        getBeatsPlanned(action.payload.planDate),
      ).pipe(
        map(plan =>
          initPlanSuccessAction({
            activities: plan[0],
            plannedNonCallActivities: plan[1],
            beatsPlanned: plan[2],
            planDate: action.payload.planDate,
            locationId: action.payload.locationId,
          }),
        ),
        catchError(error => of(initPlanFailAction({error: error}))),
      ),
    ),
  );
};

export const addBeatsToPlanEpic = action$ => {
  return action$.pipe(
    ofType(ADD_BEATS_TO_PLAN_START_ACTION),
    switchMap(action =>
      from(loadDoctorsForBeats(action.payload.beats)).pipe(
        map(doctors =>
          addBeatsToPlanSuccessAction({
            doctors: doctors.map(doctor => {
              doctor.status = 'A';
              doctor.planned = 1;
              return doctor;
            }),
          }),
        ),
        catchError(error => of(addBeatsToPlanFailAction(error))),
      ),
    ),
  );
};

export const addDoctorToPlanEpic = action$ => {
  return action$.pipe(
    ofType(ADD_DOCTORS_TO_PLAN_START_ACTION),
    map(action =>
      addBeatsToPlanSuccessAction({
        doctors: action.payload.doctors,
        isPlanned: action.payload.isPlanned,
      }),
    ),
    catchError(error => of(addBeatsToPlanFailAction(error))),
  );
};

export const removeDoctorFromPlanEpic = action$ => {
  return action$.pipe(
    ofType(REMOVE_DOCTOR_FROM_PLAN_START),
    map(action => {
      const activities = action.payload.activities.map(activity => {
        console.log(activity.id, action.payload.activity);
        if (activity.id === action.payload.activity) {
          activity.status = 'D';
        }
        return activity;
      });
      return removeDoctorFromPlanSuccessAction({activities: activities});
    }),
    catchError(error => of(removeDoctorFromPlanFailAction(error))),
  );
};

export const saveDoctorsToPlanEpic = action$ => {
  return action$.pipe(
    ofType(SAVE_DOCTOR_TO_PLAN_START),
    switchMap(action =>
      from(savePlanForDateAndLocation(action.payload.activities)).pipe(
        map(activities =>
          saveDoctorsToPlanSuccessAction({activities: activities}),
        ),
        catchError(error => of(saveDoctorsToPlanFailAction({error: error}))),
      ),
    ),
  );
};

export const fetchSummaryEpic = action$ => {
  return action$.pipe(
    ofType(FETCH_PLAN_SUMMARY_START),
    switchMap(action =>
      from(
        getPlanSummaryForYearMonthAndLocation(
          action.payload.planDate,
          action.payload.locationId,
        ),
      ).pipe(
        map(payload => fetchPlanSummarySuccessAction({summary: payload})),
        catchError(error => fetchPlanSummaryFailAction({error: error})),
      ),
    ),
  );
};

export const changePlanActionTypeEpic = action$ => {
  return action$.pipe(
    ofType(CHANGE_PLAN_TYPE_START_ACTION),
    map(
      action =>
        changePlanTypeSuccessAction({currentAction: action.payload.actionType}),
      catchError(error => of(changePlanTypeFailAction({error: error}))),
    ),
  );
};

export const initNoncallEpic = action$ => {
  return action$.pipe(
    ofType(INIT_NON_CALL_START),
    switchMap(action =>
      forkJoin(
        loadAllNoncallActivities(),
        loadNonCallActivitiesForDate(
          action.payload.date,
          action.payload.locationId,
        ),
      ).pipe(
        map(activities =>
          initNonCallSuccessAction({
            allNoncallActivities: activities[0],
            plannedNonCallActivities: activities[1],
          }),
        ),
        catchError(error => of(initNonCallFailAction({error: error}))),
      ),
    ),
  );
};

export const saveNonCallEpic = action$ => {
  return action$.pipe(
    ofType(SAVE_NON_CALL_TO_PLAN_START),
    switchMap(action =>
      from(saveNonCallActivities(action.payload.activities)).pipe(
        map(activities => saveNonCallActivitiesSuccessAction(activities)),
        catchError(error =>
          of(saveNonCallActivitiesFailAction({error: error})),
        ),
      ),
    ),
  );
};

export const saveManagerDoctorsEpic = action$ => {
  return action$.pipe(
    ofType(SAVE_MANAGER_PLAN_TO_LOCAL_START),
    switchMap(action =>
      from(
        saveManagerDoctors(
          action.payload.tms,
          action.payload.removedTms,
          action.payload.date,
          action.payload.locationId,
          action.payload.employeeId,
        ),
      ).pipe(
        map(result => saveManagerDoctorToLocalSuccessAction({result: result})),
        catchError(error =>
          of(saveManagerDoctorToLocalFailAction({error: error})),
        ),
      ),
    ),
  );
};

export const initManagerDoctorsEpic = action$ => {
  return action$.pipe(
    ofType(INIT_MANAGER_PLAN_TO_LOCAL_START),
    switchMap(action =>
      from(getManagerDoctorLocation(action.payload.date)).pipe(
        map(result => initManagerPlanSuccessAction({result: result})),
        catchError(error => of(initManagerPlanFailAction({error: error}))),
      ),
    ),
  );
};

export const resetPlanEpic = action$ => {
  return action$.pipe(
    ofType(RESET_TOUR_PLAN_START),
    map(action => resetPlanSuccessAction({})),
    catchError(error => of(resetPlanFailAction({error: error}))),
  );
};
