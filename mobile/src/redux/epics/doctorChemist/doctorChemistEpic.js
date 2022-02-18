import {ofType} from 'redux-observable';
import {
  INIT_DOCTOR_ADD_FAIL,
  INIT_DOCTOR_ADD_START,
  INIT_DOCTOR_ADD_SUCCESS,
  INIT_DOCTOR_LIST_START,
  SAVE_DOCTOR_START,
} from '../../actions/doctorChemist/doctorListActionConstant';
import {catchError, filter, map, retry, switchMap} from 'rxjs/operators';
import {
  loadDoctorSpecialityConfigs,
  loadMyBeats,
  loadMyDoctors,
} from '../../../db/CommonDbService';
import {forkJoin, from, of} from 'rxjs';
import {
  initDoctorAddFailAction,
  initDoctorAddSuccessAction,
  initDoctorListFailAction,
  initDoctorListSuccessAction,
  saveDoctorFailAction,
  saveDoctorSuccessAction,
} from '../../actions/doctorChemist/doctorListAction';
import {addDoctor} from '../../../api/doctorChemistApi';
import {addDoctorToLocal} from '../../../db/sync/masterDataDbService';
import {
  AUTHENTICATION_FAIL_ACTION,
  AUTHENTICATION_START_ACTION,
  AUTHENTICATION_SUCCESS_ACTION,
  LOGOUT_FAIL,
  LOGOUT_START,
  LOGOUT_SUCCESS,
} from '../../actions/actionConstants';
import {hideSpinner, showSpinner} from '../../actions/globalActions';

export const addDoctorShowSpinnerEpic = action$ =>
  action$.pipe(
    filter(action => action.type === INIT_DOCTOR_ADD_START),
    map(showSpinner),
  );

export const addDoctorHideSpinnerEpic = action$ =>
  action$.pipe(
    filter(
      action =>
        action.type === INIT_DOCTOR_ADD_SUCCESS ||
        action.type === INIT_DOCTOR_ADD_FAIL,
    ),
    map(hideSpinner),
  );

export const doctorListForMappingEpic = action$ => {
  return action$.pipe(
    ofType(INIT_DOCTOR_LIST_START),
    switchMap(action =>
      from(loadMyDoctors(action.payload.locationId)).pipe(
        map(doctors => initDoctorListSuccessAction({doctors: doctors})),
        catchError(error => of(initDoctorListFailAction({error: error}))),
      ),
    ),
  );
};

export const initDoctorAddEpic = action$ => {
  return action$.pipe(
    ofType(INIT_DOCTOR_ADD_START),
    switchMap(action =>
      forkJoin(
        loadDoctorSpecialityConfigs(),
        loadMyBeats(action.payload.locationId),
      ).pipe(
        map(initialData =>
          initDoctorAddSuccessAction({
            specialities: initialData[0],
            beats: initialData[1],
          }),
        ),
        catchError(error => of(initDoctorAddFailAction({error: error}))),
      ),
    ),
  );
};

export const saveDoctorEpic = action$ => {
  return action$.pipe(
    ofType(SAVE_DOCTOR_START),
    switchMap(action =>
      from(addDoctor(action.payload.doctor, action.payload.certificate)).pipe(
        switchMap(response =>
          from(addDoctorToLocal(response.response)).pipe(
            map(data => saveDoctorSuccessAction({doctor: response.response})),
            catchError(error => of(saveDoctorFailAction({error: error}))),
          ),
        ),
        catchError(error => of(saveDoctorFailAction({error: error}))),
      ),
    ),
  );
};
