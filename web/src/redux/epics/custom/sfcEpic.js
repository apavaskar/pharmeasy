import {catchError, debounceTime, filter, forkJoin, map, of, retry, switchMap} from "rxjs";
import {ofType} from "redux-observable";
import {SFC_CREATE_DISTANCE_FAIL, SFC_CREATE_DISTANCE_START, SFC_CREATE_DISTANCE_SUCCESS, SFC_SEARCH_FAIL, SFC_SEARCH_START, SFC_SEARCH_SUCCESS, SFC_UPDATE_DISTANCE_FAIL, SFC_UPDATE_DISTANCE_START, SFC_UPDATE_DISTANCE_SUCCESS} from "../../actions/custom/sfcActionConstants";
import {hideSpinner, showSpinner} from "../../actions/widgets/widgetActions";
import {sfcCreateDistanceRequest, sfcSearchRequest, sfcUpdateDistanceRequest} from "../../../api/customApi";
import {sfcCreateDistanceFailAction, sfcCreateDistanceSuccessAction, sfcFailAction, sfcSuccessAction, sfcUpdateDistanceFailAction, sfcUpdateDistanceSuccessAction} from "../../actions/custom/sfcAction";
import {townListForChemistRequest} from "../../../api/commonApi";

export const showSFCLoaderEpic = action$ =>
    action$.pipe(
        filter(
            action =>
                action.type === SFC_SEARCH_START ||
                action.type === SFC_CREATE_DISTANCE_START ||
                action.type === SFC_UPDATE_DISTANCE_START
        ),
        map(showSpinner),
    )

export const hideSFCLoaderEpic = action$ =>
    action$.pipe(
        filter(
            action =>
                action.type === SFC_SEARCH_SUCCESS ||
                action.type === SFC_SEARCH_FAIL ||
                action.type === SFC_UPDATE_DISTANCE_SUCCESS ||
                action.type === SFC_UPDATE_DISTANCE_FAIL ||
                action.type === SFC_CREATE_DISTANCE_SUCCESS ||
                action.type === SFC_CREATE_DISTANCE_FAIL

        ),
        map(hideSpinner),
    );


export const sfcSearchEpic = (action$) =>
    action$.pipe(
        ofType(SFC_SEARCH_START),
        debounceTime(500),
        switchMap(action =>
          forkJoin(sfcSearchRequest(action.payload),
              townListForChemistRequest(action.payload)
              ).pipe(
              retry(1),
                  map( response =>
                    sfcSuccessAction({sfcs: response[0].response, townList: response[1].response})),
                    catchError((error) => of(sfcFailAction({error: error}))),
              )),
              catchError((error) => of(sfcFailAction({error: error}))
    ));

export const sfcUpdateDistancehEpic = (action$) =>
    action$.pipe(
        ofType(SFC_UPDATE_DISTANCE_START),
        debounceTime(500),
        switchMap(action =>
            sfcUpdateDistanceRequest(action.payload).pipe(
                retry(1),
                map( response =>
                    sfcUpdateDistanceSuccessAction({sfcs: response.response})),
                catchError((error) => of(sfcUpdateDistanceFailAction({error: error}))),
            )),
        catchError((error) => of(sfcUpdateDistanceFailAction({error: error}))
        ));


export const sfcCreateDistanceEpic = (action$) =>
    action$.pipe(
        ofType(SFC_CREATE_DISTANCE_START),
        debounceTime(500),
        switchMap(action =>
            sfcCreateDistanceRequest(action.payload).pipe(
                retry(1),
                map( response =>
                    sfcCreateDistanceSuccessAction({sfc: response.response})),
                catchError((error) => of(sfcCreateDistanceFailAction({error: error}))),
            )),
        catchError((error) => of(sfcCreateDistanceFailAction({error: error}))
        ));
