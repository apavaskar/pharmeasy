import {
  INIT_DIGITAL_CALL_START,
  SAVE_DIGITAL_CALL_START,
} from '../../actions/digitalCall/digitalCallActionConstant';
import {ofType} from 'redux-observable';
import {catchError, map, switchMap} from 'rxjs/operators';
import {
  initDigitalCallFailAction,
  initDigitalCallSuccessAction,
  saveDigitalCallFailAction,
  saveDigitalCallSuccessAction,
} from '../../actions/digitalCall/digicalCallActions';
import {from, of, pipe} from 'rxjs';
import {loadDetailingBrands} from '../../../db/BrandDetailingDbService';
import {saveDigitalCallData} from '../../../db/digitalCall/digitalCallDbService';

export const initDigitalCallEpic = action$ => {
  return action$.pipe(
    ofType(INIT_DIGITAL_CALL_START),
    switchMap(action =>
      from(loadDetailingBrands()).pipe(
        map(brands => initDigitalCallSuccessAction({allBrands: brands})),
        catchError(error => initDigitalCallFailAction({error: error})),
      ),
    ),
    catchError(error => initDigitalCallFailAction({error: error})),
  );
};

export const digitalCallSaveEpic = action$ => {
  return action$.pipe(
    ofType(SAVE_DIGITAL_CALL_START),
    switchMap(action =>
      from(
        saveDigitalCallData(
          action.payload.visitId,
          action.payload.duration,
          action.payload.templateId,
          action.payload.visitModeId,
        ),
      ).pipe(
        map(action => saveDigitalCallSuccessAction({})),
        catchError(error => of(saveDigitalCallFailAction({error: error}))),
      ),
    ),
  );
};
