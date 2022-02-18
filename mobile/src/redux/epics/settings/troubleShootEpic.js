import {catchError, filter, map, switchMap} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import {from, of} from 'rxjs';
import {hideSpinner, showSpinner} from '../../actions/globalActions';
import {
  TROUBLESHOOT_INIT_FAIL,
  TROUBLESHOOT_INIT_START,
  TROUBLESHOOT_INIT_SUCCESS,
} from '../../actions/troubleshoot/troubleShootActionConstants';
import {troubleshootAPI} from '../../../api/settingsApi';
import {
  troubleShootFailAction,
  troubleShootSuccessAction,
} from '../../actions/troubleshoot/troubleShootAction';

export const troubleShootShowSpinnerEpic = action$ =>
  action$.pipe(
    filter(action => action.type === TROUBLESHOOT_INIT_START),
    map(showSpinner),
  );

export const troubleShootHideSpinnerEpic = action$ =>
  action$.pipe(
    filter(
      action =>
        action.type === TROUBLESHOOT_INIT_SUCCESS ||
        action.type === TROUBLESHOOT_INIT_FAIL,
    ),
    map(hideSpinner),
  );

export const troubleShootStartEpic = action$ => {
  return action$.pipe(
    ofType(TROUBLESHOOT_INIT_START),
    switchMap(action =>
      from(troubleshootAPI(action.payload.data)).pipe(
        map(profileResponse =>
          troubleShootSuccessAction({
            success: true,
          }),
        ),
        catchError(error => of(troubleShootFailAction({error: error}))),
      ),
    ),
    catchError(error => of(troubleShootFailAction({error: error}))),
  );
};
