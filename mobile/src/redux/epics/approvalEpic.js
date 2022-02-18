import {ofType} from 'redux-observable';
import {
  APPROVE_PATIENT_RCPA_START,
  REFRESH_PATIENT_APPROVAL_START,
  REJECT_PATIENT_RCPA_START,
} from '../actions/actionConstants';
import {catchError, map, switchMap} from 'rxjs/operators';
import {
  approvePatientRCPA,
  getPatientForApprovalAPI,
} from '../../api/approvaApi';
import {
  approvePatientRCPAFailAction,
  approvePatientRCPASuccessAction,
  initPatientApprovalListFailAction,
  initPatientApprovalListSuccessAction,
} from '../actions/approvaAction';
import {of} from 'rxjs';

export const refreshApprovalPatientEpic = action$ => {
  return action$.pipe(
    ofType(REFRESH_PATIENT_APPROVAL_START),
    switchMap(action =>
      getPatientForApprovalAPI(
        action.payload.locationId,
        action.payload.certificate,
      ).pipe(
        map(data =>
          initPatientApprovalListSuccessAction({approvals: data.response}),
        ),
        catchError(error =>
          of(initPatientApprovalListFailAction({error: error})),
        ),
      ),
    ),
  );
};

export const patientRCPAApprovalEpic = action$ => {
  return action$.pipe(
    ofType(APPROVE_PATIENT_RCPA_START),
    switchMap(action =>
      approvePatientRCPA(
        action.payload.id,
        action.payload.certificate,
        action.payload.actionToTake,
      ).pipe(
        switchMap(data =>
          getPatientForApprovalAPI(
            action.payload.locationId,
            action.payload.certificate,
          ).pipe(
            map(data =>
              approvePatientRCPASuccessAction({approvals: data.response}),
            ),
            catchError(error =>
              of(approvePatientRCPAFailAction({error: error})),
            ),
          ),
        ),
      ),
    ),
  );
};

