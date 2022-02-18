import {
  DELETE_HOSPITAL_ENTRY_START,
  HOSPITAL_ENTRY_START,
  INIT_HOSPITAL_DAILY_ENTRY_START,
  INIT_HOSPITAL_ENTRY_START,
  INIT_HOSPITAL_LIST_START,
  SAVE_HOSPITAL_DAILY_ENTRY_START,
} from '../actions/actionConstants';
import {
  deleteHospitalEntryFailAction,
  deleteHospitalEntrySuccessAction,
  initHospitalDailyEntryFailAction,
  initHospitalDailyEntrySuccessAction,
  initHospitalEntryFailAction,
  initHospitalEntrySuccessAction,
  initHospitalListFailAction,
  initHospitalListSuccessAction,
  saveHospitalDailyEntryFailAction,
  saveHospitalDailyEntrySuccessAction,
  saveHospitalEntryFailAction,
  saveHospitalEntrySuccessAction,
} from '../actions/hospitalAction';
import {
  deleteEntry,
  getDailyEntry,
  getDoctorsForHospital,
  loadEntries,
  loadHospitalsForLocation,
  saveDailyEntry,
  saveHospitalEntry,
} from '../../db/HospitalDbService';
import {forkJoin, from, of} from 'rxjs';
import {ofType} from 'redux-observable';
import {catchError, map, switchMap} from 'rxjs/operators';

export const initHospitalListEpic = action$ => {
  return action$.pipe(
    ofType(INIT_HOSPITAL_LIST_START),
    switchMap(action =>
      from(loadHospitalsForLocation(action.payload.locationId)).pipe(
        map(hospitals => initHospitalListSuccessAction({hospitals: hospitals})),
        catchError(error => of(initHospitalListFailAction({error: error}))),
      ),
    ),
  );
};

export const saveHospitalEntryEpic = action$ => {
  return action$.pipe(
    ofType(HOSPITAL_ENTRY_START),
    switchMap(action =>
      from(saveHospitalEntry(action.payload.entry)).pipe(
        map(response => saveHospitalEntrySuccessAction({response: response})),
        catchError(error => of(saveHospitalEntryFailAction({error: error}))),
      ),
    ),
  );
};

export const loadEntriesEpic = action$ => {
  return action$.pipe(
    ofType(INIT_HOSPITAL_ENTRY_START),
    switchMap(action =>
      from(loadEntries(action.payload.hospitalId, action.payload.yyyyMm)).pipe(
        map(data => initHospitalEntrySuccessAction({entries: data})),
        catchError(error => of(initHospitalEntryFailAction({error: error}))),
      ),
    ),
  );
};

export const deleteHospitalEntryEpic = action$ => {
  return action$.pipe(
    ofType(DELETE_HOSPITAL_ENTRY_START),
    switchMap(action =>
      from(
        deleteEntry(
          action.payload.id,
          action.payload.hospitalId,
          action.payload.yyyyMm,
        ),
      ).pipe(
        map(data => deleteHospitalEntrySuccessAction({entries: data})),
        catchError(error => of(deleteHospitalEntryFailAction({error: error}))),
      ),
    ),
  );
};

export const initHospitalDailyEntryEpic = action$ => {
  return action$.pipe(
    ofType(INIT_HOSPITAL_DAILY_ENTRY_START),
    switchMap(action =>
      forkJoin(
        getDailyEntry(action.payload.hospitalId, action.payload.yyyyMmDd),
        getDoctorsForHospital(action.payload.hospitalId),
      ).pipe(
        map(entry =>
          initHospitalDailyEntrySuccessAction({
            entry: entry[0],
            doctors: entry[1],
          }),
        ),
        catchError(error =>
          of(initHospitalDailyEntryFailAction({error: error})),
        ),
      ),
    ),
  );
};

export const saveHospitalDailyEntryEpic = action$ => {
  return action$.pipe(
    ofType(SAVE_HOSPITAL_DAILY_ENTRY_START),
    switchMap(action =>
      forkJoin(
        saveDailyEntry(action.payload.entry),
        getDoctorsForHospital(action.payload.hospitalId),
      ).pipe(
        map(entry =>
          saveHospitalDailyEntrySuccessAction({
            entry: entry[0],
            doctors: entry[1],
          }),
        ),
        catchError(error =>
          of(saveHospitalDailyEntryFailAction({error: error})),
        ),
      ),
    ),
  );
};
