import {ofType} from 'redux-observable';
import {catchError, map, switchMap} from 'rxjs/operators';
import {forkJoin, of} from 'rxjs';
import {loadConfigs} from '../../../db/configs/configDbService';
import {LOAD_CONFIGS_START} from '../../actions/configs/ConfigActionConstants';
import {
  loadConfigFailAction,
  loadConfigSuccessAction,
} from '../../actions/configs/ConfigActions';
import {loadSystemConfigs} from '../../../db/CommonDbService';

export const loadConfigsEpic = action$ => {
  return action$.pipe(
    ofType(LOAD_CONFIGS_START),
    switchMap(action =>
      forkJoin(loadSystemConfigs()).pipe(
        map(data =>
          loadConfigSuccessAction({configs: [], systemConfigs: data[0]}),
        ),
        catchError(error => of(loadConfigFailAction({error: error}))),
      ),
    ),
  );
};
