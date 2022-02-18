import {createReducer} from '../reducerUtils';
import {
  BD_INIT_FAIL,
  BD_INIT_SUCCESS,
  BD_SAVE_STATE_START,
} from '../../actions/brandDetailing/brandDetailingActionConstants';
import {SAVE_VISIT_DATA_SUCCESS} from '../../actions/actionConstants';

const initialState = {
  allBrands: [],
  brandsDetailed: [],
};

const initBDSuccessReducer = (state = initialState, payload) => {
  if (state.brandsDetailed.length !== 0) {
    return {
      ...state,
      allBrands: payload.allBrands,
    };
  }
  return {
    ...state,
    allBrands: payload.allBrands,
    brandsDetailed: payload.brandsDetailed,
  };
};

const initBDFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const saveBrandDetailedStateReducer = (state = initialState, payload) => {
  return {
    ...state,
    brandsDetailed: payload.brandsDetailed,
  };
};

const resetBrandDetailingStateReducer = (state = initialState, payload) => {
  return initialState;
};



export default createReducer(initialState, {
  [BD_INIT_SUCCESS]: initBDSuccessReducer,
  [BD_INIT_FAIL]: initBDFailReducer,
  [BD_SAVE_STATE_START]: saveBrandDetailedStateReducer,
  [SAVE_VISIT_DATA_SUCCESS]: resetBrandDetailingStateReducer,
});
