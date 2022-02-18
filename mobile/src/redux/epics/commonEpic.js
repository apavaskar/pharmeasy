import {ofType} from 'redux-observable';
import {
  LOAD_BEATS_START_ACTION,
  LOAD_DOCTORS_START_ACTION,
  LOAD_EMPLOYEE_START_ACTION,
} from '../actions/actionConstants';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {getMyProfile} from '../../db/EmployeeProfileService';
import {
  loadBeatsFailAction,
  loadBeatsSuccessAction,
  loadDoctorsFailAction,
  loadDoctorsSuccessAction,
  loadEmployeeFailAction,
  loadEmployeeSuccessAction,
} from '../actions/comonAction';
import { loadMyBeats, loadMyDoctors } from "../../db/CommonDbService";

export const loadEmployeeProfileEpic = action$ => {
  return action$.pipe(
    ofType(LOAD_EMPLOYEE_START_ACTION),
    switchMap(action =>
      from(getMyProfile()).pipe(
        map(profile => loadEmployeeSuccessAction({employee: profile})),
        catchError(error => of(loadEmployeeFailAction({error: error}))),
      ),
    ),
  );
};

export const loadBeatsEpic = action$ => {
  return action$.pipe(
    ofType(LOAD_BEATS_START_ACTION),
    switchMap(action =>
      from(loadMyBeats(action.payload.locationId)).pipe(
        map(beats => loadBeatsSuccessAction({beats: beats})),
        catchError(error => of(loadBeatsFailAction({error: error}))),
      ),
    ),
  );
};

export const loadDoctorsEpic = action$ => {
  return action$.pipe(
    ofType(LOAD_DOCTORS_START_ACTION),
    switchMap(action =>
      from(loadMyDoctors(action.payload.locationId)).pipe(
        map(doctors => loadDoctorsSuccessAction({doctors: doctors})),
        catchError(error => of(loadDoctorsFailAction({error: error}))),
      ),
    ),
  );
};
