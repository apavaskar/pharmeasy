import {
  INIT_DIGITAL_CALL_FAIL,
  INIT_DIGITAL_CALL_SUCCESS,
} from '../../actions/digitalCall/digitalCallActionConstant';
import {createReducer} from '../reducerUtils';
import {LOAD_DIGITAL_TEMPLATE_FAIL, LOAD_DIGITAL_TEMPLATE_SUCCESS} from "../../actions/actionConstants";

const initialState = {
  allBrands: [],
  allTemplates: [],
  error: {},
};

const initDigitalCallSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    allBrands: payload.allBrands,
  };
};

const initDigitalCallFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    allBrands: [],
    error: payload.error,
  };
};

const loadDigitalTemplatesSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    allTemplates: payload.digitalTemplates,
  };
};

const loadDigitalTemplatesFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

export default createReducer(initialState, {
  [INIT_DIGITAL_CALL_SUCCESS]: initDigitalCallSuccessReducer,
  [INIT_DIGITAL_CALL_FAIL]: initDigitalCallFailReducer,
  [LOAD_DIGITAL_TEMPLATE_SUCCESS]: loadDigitalTemplatesSuccessReducer,
  [LOAD_DIGITAL_TEMPLATE_FAIL]: loadDigitalTemplatesFailReducer,
});
