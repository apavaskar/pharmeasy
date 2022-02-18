import {LOGIN_FAIL, LOGIN_START} from "../actions/auth/authActionConstants";
import {loginRequest} from "../../api/authApi";
import {authFailAction} from "../actions/auth/authAction";
import {catchError, debounceTime, filter, map, of, retry, switchMap} from "rxjs";
import {ofType} from "redux-observable";
import { userProfileFailAction, userProfileSuccessAction } from "../actions/profile/profileAction";
import { userProfileRequest } from "../../api/userProfileApi";
import {showMessageAction} from "../actions/global/globalActions";
import {hideSpinner, showSpinner} from "../actions/widgets/widgetActions";
import {PROFILE_FETCHED_SUCCESS} from "../actions/profile/profileActionConstants";

export const showLoaderEpic = action$ =>
    action$.pipe(
        filter(
            action =>
                action.type === LOGIN_START
        ),
        map(showSpinner),
    )

export const hideLoaderEpic = action$ =>
    action$.pipe(
        filter(
            action =>
                action.type === LOGIN_FAIL ||
                action.type === PROFILE_FETCHED_SUCCESS
        ),
        map(hideSpinner),
    );


export const authFailEpic = action$ =>
    action$.pipe(
        ofType(LOGIN_FAIL),
        map(action => showMessageAction({error: action.payload}))
    )

export const loginStartEpic = (action$) =>
    action$.pipe(
        ofType(LOGIN_START),
        debounceTime(500),
        switchMap(action =>
          loginRequest(action.payload).pipe(
              retry(1),
              switchMap(authResponse =>
                userProfileRequest(authResponse.response).pipe(
                  map(profile=>
                    userProfileSuccessAction({auth: authResponse.response, profile: profile.response})),
                    catchError((error) => of(userProfileFailAction({error: error}))),
              )),
              catchError((error) => of(authFailAction({error: error}))))
    ));

