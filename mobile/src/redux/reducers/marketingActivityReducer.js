import {createReducer} from './reducerUtils';
import {
  LOAD_MASTERS_FOR_MKT_FAIL,
  LOAD_MASTERS_FOR_MKT_SUCCESS,
} from '../actions/actionConstants';

const initialState = {
  brands: [],
  doctors: [],
  error: {},
};

const loadMastersSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    brands: payload.brands,
    doctors: payload.doctors,
  };
};

const loadMastersFailReducer = (state = initialState, payload) => {
  return {
    ...state,
  };
};

export default createReducer(initialState, {
  [LOAD_MASTERS_FOR_MKT_SUCCESS]: loadMastersSuccessReducer,
  [LOAD_MASTERS_FOR_MKT_FAIL]: loadMastersFailReducer,
});
