import {ofType} from 'redux-observable';
import {
  CLOSE_DETAILING_MODAL_START,
  DOWNLOAD_DETAILING_FAIL,
  DOWNLOAD_DETAILING_START,
  DOWNLOAD_DETAILING_SUCCESS,
  INIT_DETAILING_BRAND_LIST_FAIL,
  INIT_DETAILING_BRAND_LIST_START,
  INIT_DETAILING_BRAND_LIST_SUCCESS,
  INIT_PRE_CALL_PLANNING_START,
  LOAD_DETAILING_THUMBNAIL_START,
  LOAD_VA_TO_DETAIL_START,
  SAVE_DETAILING_PRECALL_START,
} from '../../actions/edetailing/edetailingConstants';
import {switchMap} from 'rxjs/src/internal/operators/switchMap';
import {
  loadDetailingBrands,
  loadFilesForDetailing,
} from '../../../db/BrandDetailingDbService';
import {from, of} from 'rxjs';
import {
  closeDetailingFailAction,
  closeDetailingSuccessAction,
  downloadDetailingFailAction,
  downloadDetailingSuccessAction,
  initBrandListForEdetailingFailAction,
  initBrandListForEdetailingSuccessAction,
  initPrecallPlanningFailAction,
  initPrecallPlanningSuccessAction,
  loadThumbnailFailAction,
  loadThumbnailSuccessAction,
  loadVAToDetailFailAction,
  loadVAToDetailSuccessAction,
  savePrecallFailAction,
  savePrecallSuccessAction,
} from '../../actions/edetailing/edetailingActions';
import {catchError, filter, map} from 'rxjs/operators';
import {getFileDetails} from '../../../api/detailingApi';
import {
  getFilesForDetailing,
  loadFilesForPreview,
  saveDetailingStats,
  saveFileToDb,
  savePreCall,
} from '../../../db/edetailing/edetailingDbService';
import {hideSpinner, showSpinner} from '../../actions/globalActions';

export const vaShowSpinnerEpic = action$ =>
  action$.pipe(
    filter(
      action =>
        action.type === DOWNLOAD_DETAILING_START ||
        action.type === INIT_DETAILING_BRAND_LIST_START,
    ),
    map(showSpinner),
  );

export const vaHideSpinnerEpic = action$ =>
  action$.pipe(
    filter(
      action =>
        action.type === INIT_DETAILING_BRAND_LIST_SUCCESS ||
        action.type === INIT_DETAILING_BRAND_LIST_FAIL ||
        action.type === DOWNLOAD_DETAILING_SUCCESS ||
        action.type === DOWNLOAD_DETAILING_FAIL,
    ),
    map(hideSpinner),
  );

export const initBrandListForEdetailingEpic = action$ => {
  return action$.pipe(
    ofType(INIT_DETAILING_BRAND_LIST_START),
    switchMap(action =>
      from(loadFilesForDetailing()).pipe(
        map(brands =>
          initBrandListForEdetailingSuccessAction({brandList: brands}),
        ),
        catchError(error =>
          of(initBrandListForEdetailingFailAction({error: error})),
        ),
      ),
    ),
    catchError(error =>
      of(initBrandListForEdetailingFailAction({error: error})),
    ),
  );
};

export const downloadVAsEpic = action$ => {
  return action$.pipe(
    ofType(DOWNLOAD_DETAILING_START),
    switchMap(action =>
      getFileDetails(action.payload).pipe(
        switchMap(fileDetails =>
          from(saveFileToDb(fileDetails.response, action.payload.fileId)).pipe(
            map(data =>
              downloadDetailingSuccessAction({
                details: fileDetails.response,
                id: action.payload.fileId,
              }),
            ),
            catchError(error =>
              of(downloadDetailingFailAction({error: error})),
            ),
          ),
        ),
        catchError(error => of(downloadDetailingFailAction({error: error}))),
      ),
    ),
  );
};

export const loadThumbnailEpic = action$ => {
  return action$.pipe(
    ofType(LOAD_DETAILING_THUMBNAIL_START),
    switchMap(action =>
      from(loadFilesForPreview()).pipe(
        map(brands => loadThumbnailSuccessAction({thumbnails: brands})),
        catchError(error => of(loadThumbnailFailAction({error: error}))),
      ),
    ),
    catchError(error => of(loadThumbnailFailAction({error: error}))),
  );
};

export const savePrecallPlanEpic = action$ => {
  return action$.pipe(
    ofType(SAVE_DETAILING_PRECALL_START),
    switchMap(action =>
      from(savePreCall(action.payload)).pipe(
        map(data => savePrecallSuccessAction({data: data})),
        catchError(error => of(savePrecallFailAction({error: error}))),
      ),
    ),
    catchError(error => of(savePrecallFailAction({error: error}))),
  );
};

export const loadVAToDetailEpic = action$ => {
  return action$.pipe(
    ofType(LOAD_VA_TO_DETAIL_START),
    switchMap(action =>
      from(getFilesForDetailing(action.payload.brandId)).pipe(
        map(files => loadVAToDetailSuccessAction({files: files})),
        catchError(error => of(loadVAToDetailFailAction({error: error}))),
      ),
    ),
    catchError(error => of(loadVAToDetailFailAction({error: error}))),
  );
};

export const initPrecallEpic = action$ => {
  return action$.pipe(
    ofType(INIT_PRE_CALL_PLANNING_START),
    switchMap(action =>
      from(loadDetailingBrands()).pipe(
        map(brands => initPrecallPlanningSuccessAction({brands: brands})),
        catchError(error => of(initPrecallPlanningFailAction({error: error}))),
      ),
    ),
  );
};

export const closeDetailingEpic = action$ => {
  return action$.pipe(
    ofType(CLOSE_DETAILING_MODAL_START),
    switchMap(action =>
      from(saveDetailingStats(action.payload)).pipe(
        map(stats => closeDetailingSuccessAction({stats: stats})),
        catchError(error => of(closeDetailingFailAction({error: error}))),
      ),
    ),
  );
};
