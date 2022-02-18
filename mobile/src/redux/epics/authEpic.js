import {
  AUTHENTICATION_FAIL_ACTION,
  AUTHENTICATION_START_ACTION,
  AUTHENTICATION_SUCCESS_ACTION,
  LOGOUT_FAIL,
  LOGOUT_START,
  LOGOUT_SUCCESS,
} from '../actions/actionConstants';
import {ofType} from 'redux-observable';
import {catchError, filter, map, switchMap} from 'rxjs/operators';
import {loginAPI} from '../../api/authApi';
import {
  authFailAction,
  logoutFailAction,
  logoutSuccessAction,
} from '../actions/authAction';
import {from, of} from 'rxjs';
import {masterSyncStartAction} from '../actions/masterSyncAction';
import {getUserProfileAPI} from '../../api/masterSyncApi';
import {hideSpinner, showSpinner} from '../actions/globalActions';
import {removeAuthCertificate} from '../../db/CommonDbService';

export const authShowSpinnerEpic = action$ =>
  action$.pipe(
    filter(
      action =>
        action.type === AUTHENTICATION_START_ACTION ||
        action.type === LOGOUT_START,
    ),
    map(showSpinner),
  );

export const authHideSpinnerEpic = action$ =>
  action$.pipe(
    filter(
      action =>
        action.type === AUTHENTICATION_SUCCESS_ACTION ||
        action.type === AUTHENTICATION_FAIL_ACTION ||
        action.type === LOGOUT_SUCCESS ||
        action.type === LOGOUT_FAIL,
    ),
    map(hideSpinner),
  );

export const authStartEpic = action$ => {
  return action$.pipe(
    ofType(AUTHENTICATION_START_ACTION),
    switchMap(action =>
      from(loginAPI(action.payload.username, action.payload.password)).pipe(
        switchMap(({response}) =>
          from(
            getUserProfileAPI(response.principal.id, response.certificate),
          ).pipe(
            map(profileResponse =>
              masterSyncStartAction({
                profile: {
                  ...profileResponse.response,
                  userId: response.principal.id,
                },
                principal: response.principal.id,
                certificate: response.certificate,
              }),
            ),
            catchError(error => of(authFailAction({error: error}))),
          ),
        ),
        catchError(error => of(authFailAction({error: error}))),
      ),
    ),
  );
};

export const logoutEpic = action$ => {
  return action$.pipe(
    ofType(LOGOUT_START),
    switchMap(action =>
      from(removeAuthCertificate()).pipe(
        map(result => logoutSuccessAction({done: result})),
        catchError(error => of(logoutFailAction({error: error}))),
      ),
    ),
  );
};
