import { ofType } from "redux-observable";
import { catchError, debounceTime, map, of, retry, switchMap } from "rxjs";
import { divisionListRequest } from "../../api/divisionApi";
import { allLocationRequest, locationHeirarchyRequest } from "../../api/locationApi";
import { INIT_DIVISON_LIST_DROPDOWN_START, INIT_LOCATION_DROPDOWN_START, INIT_LOCATION_HEIRARCHY_DROPDOWN_START } from "../actions/widgets/widgetActionConstants";
import {divisionListDropdownFailAction, divisionListDropdownSuccessAction, locationDropdownFailAction, locationDropdownSuccessAction, locationHeirarchyDropdownFailAction, locationHeirarchyDropdownSuccessAction} from "../actions/widgets/widgetActions";

export const locationHeirarchyDropdownStartEpic = (action$) =>
    action$.pipe(
        ofType(INIT_LOCATION_HEIRARCHY_DROPDOWN_START),
        debounceTime(500),
        switchMap(action =>
          locationHeirarchyRequest(action.payload).pipe(
              retry(1),
              map(locations=>
                locationHeirarchyDropdownSuccessAction({locations: locations.response})),
                    catchError((error) => of(locationHeirarchyDropdownFailAction({error: error}))),
              )),
              catchError((error) => of(locationHeirarchyDropdownFailAction({error: error})))
    );

export const divisionListDropdownStartEpic = (action$) =>
    action$.pipe(
        ofType(INIT_DIVISON_LIST_DROPDOWN_START),
        debounceTime(500),
        switchMap(action =>
          divisionListRequest(action.payload).pipe(
              retry(1),
              map(divisions =>
                divisionListDropdownSuccessAction({divisions: divisions.response})),
                    catchError((error) => of(divisionListDropdownFailAction({error: error}))),
              )),
              catchError((error) => of(divisionListDropdownFailAction({error: error})))
    );

    export const locationDropdownStartEpic = (action$) =>
    action$.pipe(
        ofType(INIT_LOCATION_DROPDOWN_START),
        debounceTime(500),
        switchMap(action =>
          allLocationRequest(action.payload).pipe(
              retry(1),
              map(locations=>
                locationDropdownSuccessAction({
                    locationId: action.payload.locationId,
                    locations: locations.response})),
                    catchError((error) => of(locationDropdownFailAction({error: error}))),
              )),
              catchError((error) => of(locationDropdownFailAction({error: error})))
    );