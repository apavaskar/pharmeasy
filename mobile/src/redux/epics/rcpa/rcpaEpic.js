import {ofType} from 'redux-observable';
import {catchError, map, switchMap} from 'rxjs/operators';
import {forkJoin, of} from 'rxjs';
import {loadAllBrands, loadChemistForDoctor} from '../../../db/CommonDbService';
import {
  SINGLE_RCPA_CHANGE_START,
  SINGLE_RCPA_INIT_START,
} from '../../actions/rcpa/rcpaActionConstants';
import {loadBrandsForRCPA, loadRCPA} from '../../../db/RCPADbService';
import {
  singleRCPAChangeFailAction,
  singleRCPAChangeSuccessAction,
  singleRCPAInitFailAction,
  singleRCPAInitSuccessAction,
} from '../../actions/rcpa/rcpaActions';
import {generateId} from '../../../db/constants';
import {toYyyyMmDd} from '../../../utils/dateUtil';

export const initRCPAEpic = action$ => {
  return action$.pipe(
    ofType(SINGLE_RCPA_INIT_START),
    switchMap(action =>
      forkJoin(
        loadChemistForDoctor(action.payload.doctor.id),
        loadBrandsForRCPA(),
        loadRCPA(
          action.payload.doctor.id,
          action.payload.visitId,
          action.payload.visitDate,
        ),
      ).pipe(
        map(data =>
          singleRCPAInitSuccessAction({
            allChemists: data[0],
            allBrands: data[1],
            rcpaHistory: data[2],
            visitId: action.payload.visitId,
          }),
        ),
        catchError(error => of(singleRCPAInitFailAction({error: error}))),
      ),
    ),
  );
};

export const singleRCPAChangeEpic = action$ => {
  return action$.pipe(
    ofType(SINGLE_RCPA_CHANGE_START),
    map(action => {
      const newValues = [
        {
          id: generateId(),
          visitId: action.payload.visitId,
          brandId: action.payload.brandId,
          doctorId: action.payload.doctorId,
          chemistId: action.payload.chemistId,
          rcpaDate: action.payload.rcpaDate,
          rcpaDateYyyyMmDd: toYyyyMmDd(action.payload.rcpaDate),
          isOwn: true,
          rxns: action.payload.rxn,
          rxnValue: action.payload.rxnValue,
          compBrandRxns: action.payload.compRxn,
          compBrandValue: action.payload.compRxnValue,
          ownBrandId: action.payload.brandId,
          compBrandQty: action.payload.compBrandQty,
          brandQty: action.payload.brandQty,
          action: 'A',
        },
      ];
      return singleRCPAChangeSuccessAction({currentValues: newValues});
    }),
    catchError(error => singleRCPAChangeFailAction({error: error})),
  );
};
