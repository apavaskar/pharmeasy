import {ofType} from 'redux-observable';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  COVERAGE_REPORT_START,
  MISSED_CALL_REPORT_START,
} from '../../actions/dashboard/effortReportActionConstant';
import {
  coverageReportFailAction,
  coverageReportSuccessAction,
  missedCallReportFailAction,
  missedCallReportSuccessAction,
} from '../../actions/dashboard/effortReportAction';
import {
  coverageReportAPI,
  missedCallReportAPI,
} from '../../../api/effortReportApi';

export const coverageReportEpic = action$ => {
  return action$.pipe(
    ofType(COVERAGE_REPORT_START),
    switchMap(action =>
      coverageReportAPI(action.payload).pipe(
        map(data =>
          coverageReportSuccessAction({
            data: data.response,
            designation: action.payload.designation,
            locationId: action.payload.locationId,
          }),
        ),
        catchError(error => of(coverageReportFailAction({error: error}))),
      ),
    ),
  );
};

export const missedCallReportEpic = action$ => {
  return action$.pipe(
    ofType(MISSED_CALL_REPORT_START),
    switchMap(action =>
      missedCallReportAPI(action.payload).pipe(
        map(data =>
          missedCallReportSuccessAction({
            data: data.response,
            designation: action.payload.designation,
            locationId: action.payload.locationId,
          }),
        ),
        catchError(error => of(missedCallReportFailAction({error: error}))),
      ),
    ),
  );
};
