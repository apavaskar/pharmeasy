import {
  CLOSE_DETAILING_MODAL_FAIL,
  CLOSE_DETAILING_MODAL_START,
  CLOSE_DETAILING_MODAL_SUCCESS,
  DOWNLOAD_DETAILING_FAIL,
  DOWNLOAD_DETAILING_START,
  DOWNLOAD_DETAILING_SUCCESS,
  INIT_DETAILING_BRAND_LIST_FAIL,
  INIT_DETAILING_BRAND_LIST_START,
  INIT_DETAILING_BRAND_LIST_SUCCESS,
  INIT_PRE_CALL_PLANNING_FAIL,
  INIT_PRE_CALL_PLANNING_START,
  INIT_PRE_CALL_PLANNING_SUCCESS,
  LOAD_DETAILING_THUMBNAIL_FAIL,
  LOAD_DETAILING_THUMBNAIL_START,
  LOAD_DETAILING_THUMBNAIL_SUCCESS,
  LOAD_VA_TO_DETAIL_FAIL,
  LOAD_VA_TO_DETAIL_START,
  LOAD_VA_TO_DETAIL_SUCCESS,
  SAVE_DETAILING_PRECALL_FAIL,
  SAVE_DETAILING_PRECALL_START,
  SAVE_DETAILING_PRECALL_SUCCESS,
} from './edetailingConstants';
import {
  showErrorMessage,
  showSuccessMessage,
} from '../../../widgets/showMessage';

export const initBrandListForEdetailingStartAction = payload => dispatch => {
  dispatch({
    type: INIT_DETAILING_BRAND_LIST_START,
    payload: payload,
  });
};

export const initBrandListForEdetailingSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Loaded the brand list',
  });
  dispatch({
    type: INIT_DETAILING_BRAND_LIST_SUCCESS,
    payload: payload,
  });
};

export const initBrandListForEdetailingFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to load brand list',
  });
  dispatch({
    type: INIT_DETAILING_BRAND_LIST_FAIL,
    payload: payload,
  });
};

export const downloadDetailingStartAction = payload => dispatch => {
  dispatch({
    type: DOWNLOAD_DETAILING_START,
    payload: payload,
  });
};

export const downloadDetailingSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'VA Downloaded',
  });
  dispatch({
    type: DOWNLOAD_DETAILING_SUCCESS,
    payload: payload,
  });
};

export const downloadDetailingFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to download VA',
  });
  dispatch({
    type: DOWNLOAD_DETAILING_FAIL,
    payload: payload,
  });
};

export const loadThumbnailStartAction = payload => dispatch => {
  dispatch({
    type: LOAD_DETAILING_THUMBNAIL_START,
    payload: payload,
  });
};

export const loadThumbnailSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Loaded all the VAs',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: LOAD_DETAILING_THUMBNAIL_SUCCESS,
    payload: payload,
  });
};

export const loadThumbnailFailAction = payload => dispatch => {
  dispatch({
    type: LOAD_DETAILING_THUMBNAIL_FAIL,
    payload: payload,
  });
};

export const savePrecallStartAction = payload => dispatch => {
  dispatch({
    type: SAVE_DETAILING_PRECALL_START,
    payload: payload,
  });
};

export const savePrecallSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Saved plan',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: SAVE_DETAILING_PRECALL_SUCCESS,
    payload: payload,
  });
};

export const savePrecallFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to save',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: SAVE_DETAILING_PRECALL_FAIL,
    payload: payload,
  });
};

export const loadVAToDetailStartAction = payload => dispatch => {
  dispatch({
    type: LOAD_VA_TO_DETAIL_START,
    payload: payload,
  });
};

export const loadVAToDetailSuccessAction = payload => dispatch => {
  dispatch({
    type: LOAD_VA_TO_DETAIL_SUCCESS,
    payload: payload,
  });
};

export const loadVAToDetailFailAction = payload => dispatch => {
  dispatch({
    type: LOAD_VA_TO_DETAIL_FAIL,
    payload: payload,
  });
};

export const initPrecallPlanningStartAction = payload => dispatch => {
  dispatch({
    type: INIT_PRE_CALL_PLANNING_START,
    payload: payload,
  });
};

export const initPrecallPlanningSuccessAction = payload => dispatch => {
  dispatch({
    type: INIT_PRE_CALL_PLANNING_SUCCESS,
    payload: payload,
  });
};

export const initPrecallPlanningFailAction = payload => dispatch => {
  dispatch({
    type: INIT_PRE_CALL_PLANNING_FAIL,
    payload: payload,
  });
};

export const closeDetailingStartAction = payload => dispatch => {
  dispatch({
    type: CLOSE_DETAILING_MODAL_START,
    payload: payload,
  });
};

export const closeDetailingSuccessAction = payload => dispatch => {
  dispatch({
    type: CLOSE_DETAILING_MODAL_SUCCESS,
    payload: payload,
  });
};

export const closeDetailingFailAction = payload => dispatch => {
  dispatch({
    type: CLOSE_DETAILING_MODAL_FAIL,
    payload: payload,
  });
};
