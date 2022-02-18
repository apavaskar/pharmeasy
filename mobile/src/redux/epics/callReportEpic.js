import {
  CHANGE_CALL_TYPE_LIST_START,
  DELETE_RCPA_START,
  HANDLE_PHYSICAL_DIGITAL_SWITCH_START,
  LOAD_MASTERS_FOR_MKT_START,
  RCPA_CHANGE_START,
  SAVE_NON_CALL_START,
} from '../actions/actionConstants';
import {ofType} from 'redux-observable';
import {catchError, map, switchMap} from 'rxjs/operators';
import {forkJoin, from, of} from 'rxjs';
import {
  changeCallTypeListFailAction,
  changeCallTypeListSuccessAction,
  deleteRCPAFailAction,
  deleteRCPASuccessAction,
  handlePhysicalDigitalSwitchFailAction,
  handlePhysicalDigitalSwitchSuccessAction,
  loadMastersForMkFailAction,
  loadMastersForMkSuccessAction,
  rcpaValueChangeFailAction,
  rcpaValueChangeSuccessAction,
  saveNonCallFailAction,
  saveNonCallSuccessAction,
} from '../actions/callReportingAction';
import {loadAllBrands, loadMyDoctors} from '../../db/CommonDbService';
import {generateId} from '../../db/constants';
import {toYyyyMmDd} from '../../utils/dateUtil';
import {reportNoncallActivity} from '../../db/NoncallDbService';

export const handlePhysicalDigitalSwitchEpic = action$ => {
  return action$.pipe(
    ofType(HANDLE_PHYSICAL_DIGITAL_SWITCH_START),
    switchMap(action =>
      forkJoin(loadAllBrands()).pipe(
        map(
          data =>
            handlePhysicalDigitalSwitchSuccessAction({
              allBrands: data[0],
              isPhysical: action.payload.isPhysical,
            }),
          catchError(error =>
            of(handlePhysicalDigitalSwitchFailAction({error: error})),
          ),
        ),
      ),
    ),
  );
};

export const rcpaEntryChangeEpic = action$ => {
  return action$.pipe(
    ofType(RCPA_CHANGE_START),
    map(
      action => {
        const brand = action.payload.brand;
        const key = `${action.payload.chemist}${action.payload.brand.id}`;
        const currentValues = action.payload.history.currentRCPA;
        let updated = false;
        let newValues = currentValues.map(value => {
          const valKey = `${value.chemistId}${value.brandId}`;
          if (valKey === key) {
            const val = action.payload.qty * brand.rxUnits * brand.rcpaValue;
            value.rxns = action.payload.qty;
            value.rxnValue = val;
            value.action = 'U';
            updated = true;
          }
          return value;
        });
        if (updated === false) {
          newValues.push({
            id: generateId(),
            visitId: action.payload.visitId,
            doctorId: action.payload.doctor.id,
            chemistId: action.payload.chemist,
            rcpaDate: action.payload.visitDate,
            rcpaDateYyyyMmDd: toYyyyMmDd(action.payload.visitDate),
            brandId: brand.id,
            isOwn: brand.ownBrandId === undefined,
            rxns: action.payload.qty,
            rxnValue: action.payload.qty * brand.rxUnits * brand.rcpaValue,
            ownBrandId: brand.ownBrandId,
            action: 'A',
          });
        }
        return rcpaValueChangeSuccessAction({currentValues: newValues});
      },
      catchError(error => of(rcpaValueChangeFailAction({error: error}))),
    ),
  );
};

export const changeCallTypeListEpic = action$ => {
  return action$.pipe(
    ofType(CHANGE_CALL_TYPE_LIST_START),
    map(
      action =>
        changeCallTypeListSuccessAction({
          activityIndex: action.payload.activityIndex,
        }),
      catchError(error => of(changeCallTypeListFailAction({error: error}))),
    ),
  );
};

export const reportNonCallEpic = action$ => {
  return action$.pipe(
    ofType(SAVE_NON_CALL_START),
    switchMap(action =>
      from(reportNoncallActivity(action.payload.activity)).pipe(
        map(activities => saveNonCallSuccessAction({activity: activities})),
        catchError(error => of(saveNonCallFailAction({error: error}))),
      ),
    ),
  );
};

export const deleteRCPAEntryEpic = action$ => {
  return action$.pipe(
    ofType(DELETE_RCPA_START),
    map(action => {
      const rcpa = action.payload.rcpa;
      rcpa.action = 'D';
      return deleteRCPASuccessAction({rcpa: rcpa});
    }),
    catchError(error => of(deleteRCPAFailAction({error: error}))),
  );
};

export const initMarketingEpic = action$ => {
  return action$.pipe(
    ofType(LOAD_MASTERS_FOR_MKT_START),
    switchMap(action =>
      forkJoin(loadAllBrands(), loadMyDoctors(action.payload.locationId)).pipe(
        map(results =>
          loadMastersForMkSuccessAction({
            brands: results[0],
            doctors: results[1],
          }),
        ),
        catchError(error => of(loadMastersForMkFailAction({error: error}))),
      ),
    ),
  );
};
