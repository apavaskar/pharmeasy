import {
  MASTER_SYNC_START,
  MASTER_SYNC_SUCCESS,
} from '../actions/actionConstants';
import {ofType} from 'redux-observable';
import {catchError, map, switchMap} from 'rxjs/operators';
import {authFailAction, authSuccessAction} from '../actions/authAction';
import {forkJoin, from, of} from 'rxjs';
import {
  getDetailingAids,
  getInventoryDetails,
  getJoineesAPI,
  getJointVisits,
  getMarketingTemplateAPI,
  getMyBeats,
  getMyBrands,
  getMyChemists,
  getMyDoctors,
  getMyTeam,
  getMyTeamPlan,
  getSystemLov,
} from '../../api/masterSyncApi';
import {masterSyncSuccessAction} from '../actions/masterSyncAction';
import {saveMasterDb} from '../../db/sync/masterDataDbService';
import {getHospitals} from '../../api/hospitalAPI';
import {toYyyyMm} from '../../utils/dateUtil';
import {syncTransactions} from './syncEpic';
import {getAllStages} from '../../api/crmApi';

export const masterSyncStartEpic = action$ => {
  return action$.pipe(
    ofType(MASTER_SYNC_START),
    switchMap(action =>
      syncTransactions(action).pipe(
        switchMap(results => syncMasters(action)),
        catchError(error => of(authFailAction({error: error}))),
      ),
    ),
    catchError(error => of(authFailAction({error: error}))),
  );
};

export const masterSyncSuccessEpic = action$ => {
  return action$.pipe(
    ofType(MASTER_SYNC_SUCCESS),
    map(action => authSuccessAction(action)),
    catchError(error => of(authFailAction({error: error}))),
  );
};

const syncMasters = action =>
  forkJoin(
    getMyBeats(action.payload.profile.location.id, action.payload.certificate),
    getJoineesAPI(
      action.payload.profile.location.id,
      action.payload.certificate,
    ),
    getMyBrands(action.payload.profile.location.id, action.payload.certificate),
    getMyChemists(
      action.payload.profile.location.id,
      action.payload.certificate,
    ),
    getMyDoctors(
      action.payload.profile.location.id,
      action.payload.certificate,
    ),
    getMarketingTemplateAPI(
      action.payload.profile.location.id,
      action.payload.certificate,
    ),
    getSystemLov('NON_CALL_ACTIVITY', action.payload.certificate),
    getSystemLov('LEAVE_TYPE', action.payload.certificate),
    getInventoryDetails(
      action.payload.profile.employee.id,
      action.payload.certificate,
    ),
    getHospitals(
      action.payload.profile.location.id,
      toYyyyMm(new Date()),
      action.payload.certificate,
    ),
    getMyTeam(action.payload.profile.location.id, action.payload.certificate),
    getMyTeamPlan(
      action.payload.profile.employee.id,
      'manager',
      action.payload.certificate,
    ),
    getMyTeamPlan(
      action.payload.profile.employee.id,
      'employee',
      action.payload.certificate,
    ),
    getJointVisits(
      action.payload.profile.employee.id,
      new Date(),
      action.payload.certificate,
    ),
    getDetailingAids(action.payload.certificate),
    getAllStages(action.payload),
    getSystemLov('DOCTOR_SPECIALITY', action.payload.certificate),
  ).pipe(
    switchMap(result =>
      from(
        saveMasterDb({
          userProfile: action.payload.profile,
          beats: result[0].response,
          joinees: result[1].response,
          brands: result[2].response,
          chemists: result[3].response,
          doctors: result[4].response,
          marketingTemplates: result[5].response,
          noncallActivities: result[6].response,
          leaveTypes: result[7].response,
          inventoryDetails: result[8].response,
          hospitals: result[9].response,
          myTeam: result[10].response,
          myTeamPlan: result[11].response,
          myPlan: result[12].response,
          jointVisits: result[13].response,
          vaFiles: result[14].response,
          certificate: action.payload.certificate,
          crmStages: result[15].response,
          specialities: result[16].response,
        }),
      ).pipe(map(data => masterSyncSuccessAction(action.payload.certificate))),
    ),
    catchError(error => of(authFailAction({error: error}))),
  );
