import {RUN_DB_INSTALL_START} from '../actions/actionConstants';
import {
  dbInstallFailAction,
  dbInstallSuccessAction,
} from '../actions/dbInstallAction';
import {catchError, map, switchMap} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {ofType} from 'redux-observable';
import {installDDL} from '../../api/installerApi';

export const dbInstallEpic = action$ => {
  return action$.pipe(
    ofType(RUN_DB_INSTALL_START),
    switchMap(action =>
      from(installDDL()).pipe(
        map(data => {
          return dbInstallSuccessAction(data);
        }),
        catchError(error => {
          return of(dbInstallFailAction({error: error}));
        }),
      ),
    ),
  );
};
