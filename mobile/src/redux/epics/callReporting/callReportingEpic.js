import {ofType} from 'redux-observable';
import {catchError, map, switchMap} from 'rxjs/operators';
import {forkJoin, from, of} from 'rxjs';
import {loadAllJoinees} from '../../../db/JoineeDbService';
import {restoreDoctor} from '../../../db/CommonDbService';
import {
  INIT_VISIT_COMMENTS_START,
  INIT_VISIT_DETAILS_START,
  SAVE_DOCTOR_COORDINATES_START,
  SAVE_VISIT_TO_DB_START,
} from '../../actions/callReporting/callReportingActionConstants';
import {
  initVisitCommentsFailAction,
  initVisitCommentsSuccessAction,
  initVisitDetailsFailAction,
  initVisitDetailsSuccessAction,
  saveDoctorCoordinatesFailAction,
  saveDoctorCoordinatesSuccessAction,
  saveVisitToLocalFailAction,
  saveVisitToLocalSuccessAction,
} from '../../actions/callReporting/callReportingAction';
import {loadJoineesForVisit} from '../../../db/callReporting/callDbService';
import {
  saveDoctorCall,
  saveDoctorCoordinatesToDb,
} from '../../../db/DoctorCallDbService';
import {getDistance} from 'geolib';
import {
  loadAllStages,
  loadSavedStages,
} from '../../../db/crm/crmstageDbService';

export const initVisitEpic = action$ => {
  return action$.pipe(
    ofType(INIT_VISIT_DETAILS_START),
    switchMap(action =>
      forkJoin(
        restoreDoctor(action.payload.doctor.id),
        loadAllJoinees(),
        loadJoineesForVisit(action.payload.visitId),
      ).pipe(
        map(data => {
          let maxDistance = 0;
          let payload = {
            doctorProfile: data[0],
            allJoinees: data[1],
            joinees: data[2],
            visitId: action.payload.visitId,
            visit: action.payload.visit,
            coordinates: action.payload.currentLocation,
            saveCurrentCoordinates: false,
          };
          if (data[0].coordinates.length === 0) {
            payload = {...payload, saveCurrentCoordinates: true};
          } else {
            let distances = [];
            data[0].coordinates.forEach(crd => {
              const distance = getDistance(
                {latitude: crd.latitude, longitude: crd.longitude},
                {
                  latitude: action.payload.currentLocation.latitude,
                  longitude: action.payload.currentLocation.longitude,
                },
              );
              distances.push(distance);
              maxDistance = Math.max(maxDistance, distance);
            });
            let shouldSaveDistance = true;
            for (const distance of distances) {
              if (distance <= 100) {
                payload = {...payload, saveCurrentCoordinates: false};
                shouldSaveDistance = false;
                break;
              }
            }
            if (shouldSaveDistance === true) {
              if (distances.length === 2) {
                return initVisitDetailsFailAction({
                  error: {
                    message: `The distance between your current location and doctors recorded location is ${maxDistance}, which is more than permissible of 100 m`,
                  },
                  locationTagError: true,
                });
              } else {
                payload = {...payload, saveCurrentCoordinates: true};
              }
            }
          }
          return initVisitDetailsSuccessAction(payload);
        }),
        catchError(error => of(initVisitDetailsFailAction({error: error}))),
      ),
    ),
  );
};

export const saveVisitEpic = action$ => {
  return action$.pipe(
    ofType(SAVE_VISIT_TO_DB_START),
    switchMap(action =>
      from(
        saveDoctorCall(
          action.payload.visitId,
          action.payload.joinees,
          action.payload.rcpa,
          action.payload.brands,
          action.payload.inputs,
          action.payload.comments,
          action.payload.crm,
          action.payload.saveCoordinates,
          action.payload.coordinates,
        ),
      ).pipe(
        map(data => saveVisitToLocalSuccessAction({data: data})),
        catchError(error => of(saveVisitToLocalFailAction({error: error}))),
      ),
    ),
  );
};

export const saveDoctorCoordinates = action$ => {
  return action$.pipe(
    ofType(SAVE_DOCTOR_COORDINATES_START),
    switchMap(action =>
      from(saveDoctorCoordinatesToDb(action.payload)).pipe(
        map(data => saveDoctorCoordinatesSuccessAction({coordinates: data})),
        catchError(error =>
          of(saveDoctorCoordinatesFailAction({error: error})),
        ),
      ),
    ),
  );
};

export const initVisitCommentsEpic = action$ => {
  return action$.pipe(
    ofType(INIT_VISIT_COMMENTS_START),
    switchMap(action =>
      forkJoin(loadAllStages(), loadSavedStages()).pipe(
        map(stages =>
          initVisitCommentsSuccessAction({
            stages: stages[0],
            savedStages: stages[1],
          }),
        ),
        catchError(error => of(initVisitCommentsFailAction({error: error}))),
      ),
    ),
  );
};
