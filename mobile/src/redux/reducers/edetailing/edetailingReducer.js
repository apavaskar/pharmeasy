import {createReducer} from '../reducerUtils';
import {
  CLOSE_DETAILING_MODAL_FAIL,
  CLOSE_DETAILING_MODAL_SUCCESS,
  INIT_PRE_CALL_PLANNING_FAIL,
  INIT_PRE_CALL_PLANNING_SUCCESS,
  LOAD_DETAILING_THUMBNAIL_FAIL,
  LOAD_DETAILING_THUMBNAIL_SUCCESS,
  LOAD_VA_TO_DETAIL_FAIL,
  LOAD_VA_TO_DETAIL_SUCCESS,
  SAVE_DETAILING_PRECALL_FAIL,
  SAVE_DETAILING_PRECALL_SUCCESS,
} from '../../actions/edetailing/edetailingConstants';

const initialState = {
  thumbnails: [],
  files: [],
  brands: [],
  showDetailing: false,
  savedPrecall: false,
};

const loadedThumbnailsSuccessReducer = (state = initialState, payload) => {
  let byBrandMap = {};
  payload.thumbnails.forEach(thumbnail => {
    const brandId = thumbnail.brandId;
    if (byBrandMap[brandId] === undefined) {
      byBrandMap[brandId] = {
        brand: {id: brandId, name: thumbnail.name},
        details: [],
      };
    }
    let details = byBrandMap[brandId].details;
    let brand = byBrandMap[brandId].brand;
    details.push(thumbnail);
    byBrandMap[brandId] = {brand: brand, details: details};
  });

  return {
    ...state,
    thumbnails: byBrandMap,
  };
};

const loadedThumbnailsFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const savedDetailingPrecallSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    savedPrecall: true,
  };
};

const savedDetailingPrecallFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    savedPrecall: false,
  };
};

const loadVAToDetailSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    files: payload.files,
    showDetailing: true,
  };
};

const loadVAToDetailFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
    showDetailing: false,
  };
};

const initPrecallPlanningSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    brands: payload.brands,
  };
};

const initPrecallPlanningFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const closeDetailingModalSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    showDetailing: false,
    files: [],
  };
};

const closeDetailingModalFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    showDetailing: false,
    error: payload.error,
  };
};

export default createReducer(initialState, {
  [LOAD_DETAILING_THUMBNAIL_SUCCESS]: loadedThumbnailsSuccessReducer,
  [LOAD_DETAILING_THUMBNAIL_FAIL]: loadedThumbnailsFailReducer,
  [SAVE_DETAILING_PRECALL_SUCCESS]: savedDetailingPrecallSuccessReducer,
  [SAVE_DETAILING_PRECALL_FAIL]: savedDetailingPrecallFailReducer,
  [LOAD_VA_TO_DETAIL_SUCCESS]: loadVAToDetailSuccessReducer,
  [LOAD_VA_TO_DETAIL_FAIL]: loadVAToDetailFailReducer,
  [INIT_PRE_CALL_PLANNING_SUCCESS]: initPrecallPlanningSuccessReducer,
  [INIT_PRE_CALL_PLANNING_FAIL]: initPrecallPlanningFailReducer,
  [CLOSE_DETAILING_MODAL_SUCCESS]: closeDetailingModalSuccessReducer,
  [CLOSE_DETAILING_MODAL_FAIL]: closeDetailingModalFailReducer,
});
