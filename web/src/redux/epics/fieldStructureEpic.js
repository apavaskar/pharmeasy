import {ofType} from "redux-observable";
import {catchError, debounceTime, map, of, retry, switchMap} from "rxjs";
import {FETCH_FIELD_STRUCTURE_START} from "../actions/reports/fieldStructure/fieldStructureActionConstants";
import {fieldStructureRequest} from "../../api/reportsApi";
import {fetchFieldStructureReportFailAction, fetchFieldStructureReportSuccessAction} from "../actions/reports/fieldStructure/fieldStructureAction";

export const fetchFieldStructureStartEpic = (action$) =>
    action$.pipe(
        ofType(FETCH_FIELD_STRUCTURE_START),
        debounceTime(500),
        switchMap(action =>
            fieldStructureRequest(action.payload).pipe(
                retry(1),
                map(structure =>
                    fetchFieldStructureReportSuccessAction({structure: structure.response, division: action.payload.division})),
                catchError((error) => of(fetchFieldStructureReportFailAction({error: error}))),
            )),
        catchError((error) => of(fetchFieldStructureReportFailAction({error: error})))
    );
