import {INIT_SETTINGS_VIEW_START} from '../actions/actionConstants';
import {ofType} from 'redux-observable';
import {catchError, map, switchMap} from 'rxjs/operators';
import { forkJoin, of } from "rxjs";
import {getLastSyncLog} from '../../db/DataSyncService';
import {
  initSettingViewFailAction,
  initSettingViewSuccessAction,
} from '../actions/settingAction';

export const initSettingsViewEpic = action$ => {
  return action$.pipe(
    ofType(INIT_SETTINGS_VIEW_START),
    switchMap(action =>
      forkJoin(getLastSyncLog('TRANNSACTION_SYNC')).pipe(
        map(data =>
          initSettingViewSuccessAction({
            lastSyncLog: data[0],
          }),
        ),
        catchError(error => of(initSettingViewFailAction({error: error}))),
      ),
    ),
  );
};
