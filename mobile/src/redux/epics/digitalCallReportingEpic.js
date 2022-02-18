import {
  LOAD_DIGITAL_TEMPLATE_START,
  SAVE_VIDEO_CALL_START,
} from '../actions/actionConstants';
import {ofType} from 'redux-observable';
import {catchError, map, switchMap} from 'rxjs/operators';
import {
  loadTemplatesForBrandAndType,
  saveDigitalCall,
} from '../../db/DoctorCallDbService';
import {
  loadDigitalTemplatesSuccessAction,
  saveVideoCallFailAction,
  saveVideoCallSuccessAction,
} from '../actions/digitalCallReportingAction';
import {from} from 'rxjs';

export const videoCallSaveEpic = action$ => {
  return action$.pipe(
    ofType(SAVE_VIDEO_CALL_START),
    switchMap(action =>
      from(saveDigitalCall(action.payload)).pipe(
        map(
          data => saveVideoCallSuccessAction(data),
          catchError(error => saveVideoCallFailAction({error: error})),
        ),
      ),
    ),
  );
};

export const loadDigitalTemplatesEpic = action$ => {
  return action$.pipe(
    ofType(LOAD_DIGITAL_TEMPLATE_START),
    switchMap(action =>
      from(
        loadTemplatesForBrandAndType(
          action.payload.brandId,
          action.payload.type,
        ),
      ).pipe(
        map(data =>
          loadDigitalTemplatesSuccessAction({digitalTemplates: data}),
        ),
        catchError(error => saveVideoCallFailAction({error: error})),
      ),
    ),
  );
};
