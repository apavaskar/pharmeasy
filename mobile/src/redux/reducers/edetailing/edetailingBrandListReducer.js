import {createReducer} from '../reducerUtils';
import {
  DOWNLOAD_DETAILING_FAIL,
  DOWNLOAD_DETAILING_SUCCESS,
  INIT_DETAILING_BRAND_LIST_FAIL,
  INIT_DETAILING_BRAND_LIST_SUCCESS,
} from '../../actions/edetailing/edetailingConstants';

const initialState = {
  brandList: [],
  refreshList: new Date(),
  downloadingVA: true,
  error: {},
};

const initBrandListSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    brandList: payload.brandList,
    refreshList: new Date(),
  };
};

const initBrandListFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const downloadDetailingSuccessReducer = (state = initialState, payload) => {
  const id = payload.id;
  const thumbnail = payload.details.thumbnailFile;
  let files = state.brandList.map(brand => {
    if (brand.id === id) {
      brand.thumbnail = thumbnail;
    }
    return brand;
  });

  return {
    ...state,
    brandList: files,
    refreshList: new Date(),
    downloadingVA: false,
  };
};

const downloadDetailingFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
    downloadingVA: false,
  };
};

export default createReducer(initialState, {
  [INIT_DETAILING_BRAND_LIST_SUCCESS]: initBrandListSuccessReducer,
  [INIT_DETAILING_BRAND_LIST_FAIL]: initBrandListFailReducer,
  [DOWNLOAD_DETAILING_SUCCESS]: downloadDetailingSuccessReducer,
  [DOWNLOAD_DETAILING_FAIL]: downloadDetailingFailReducer,
});
