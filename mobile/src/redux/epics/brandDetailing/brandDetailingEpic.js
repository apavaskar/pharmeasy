import {ofType} from 'redux-observable';
import {catchError, map, switchMap} from 'rxjs/operators';
import {forkJoin, of} from 'rxjs';
import {
  loadBrandsDetailedForVisit,
  loadDetailingBrands,
} from '../../../db/BrandDetailingDbService';
import {BD_INIT_START} from '../../actions/brandDetailing/brandDetailingActionConstants';
import {
  bdInitFailAction,
  bdInitSuccessAction,
} from '../../actions/brandDetailing/brandDetailingAction';

export const initBrandDetailingEpic = action$ => {
  return action$.pipe(
    ofType(BD_INIT_START),
    switchMap(action =>
      forkJoin(
        loadDetailingBrands(),
        loadBrandsDetailedForVisit(action.payload.visitId),
      ).pipe(
        map(data =>
          bdInitSuccessAction({
            allBrands: data[0],
            brandsDetailed: data[1],
            visitId: action.payload.visitId,
          }),
        ),
        catchError(error => of(bdInitFailAction({error: error}))),
      ),
    ),
  );
};

export const initPreplanningEpic = action$ => {
  return action$.pipe(
    ofType(BD_INIT_START),
    switchMap(action =>
      loadDetailingBrands().pipe(
        map(data =>
          bdInitSuccessAction({
            allBrands: data[0],
            brandsDetailed: data[1],
            visitId: action.payload.visitId,
          }),
        ),
        catchError(error => of(bdInitFailAction({error: error}))),
      ),
    ),
  );
};
