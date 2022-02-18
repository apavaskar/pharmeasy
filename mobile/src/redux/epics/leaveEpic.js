import {INIT_LEAVE_START, LEAVE_APPLY_START} from '../actions/actionConstants';
import {loadLeaveTypes, saveLeavesToDb} from '../../db/LeaveDbService';
import {
  applyLeaveFailAction,
  applyLeaveSuccessAction,
  initLeaveFailAction,
  initLeaveSuccessAction,
} from '../actions/leaveAction';
import {catchError, map, switchMap} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {ofType} from 'redux-observable';
import {applyLeaveAPI} from '../../api/leaveApi';

export const initLeaveEpic = action$ => {
  return action$.pipe(
    ofType(INIT_LEAVE_START),
    switchMap(action =>
      from(loadLeaveTypes()).pipe(
        map(types => initLeaveSuccessAction({leaveTypes: types})),
        catchError(error => of(initLeaveFailAction({error: error}))),
      ),
    ),
  );
};

export const applyLeaveEpic = action$ => {
  return action$.pipe(
    ofType(LEAVE_APPLY_START),
    switchMap(action =>
      from(
        applyLeaveAPI(action.payload.leave, action.payload.certificate),
      ).pipe(
        switchMap(response =>
          from(saveLeavesToDb(response)).pipe(
            map(data => applyLeaveSuccessAction(data)),
            catchError(error => of(applyLeaveFailAction({error: error}))),
          ),
        ),
      ),
    ),
  );
};
