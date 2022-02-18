import { createReducer } from './reducerUtils';
import {FETCH_FIELD_STRUCTURE_FAIL, FETCH_FIELD_STRUCTURE_SUCCESS} from "../actions/reports/fieldStructure/fieldStructureActionConstants";
const initialState = {
  structure: [],
    division: {},
  error: {}
};

const fieldStructureSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
      division: payload.division,
      structure: payload.structure
  };
};

const fieldStructureFailReducer = (state = initialState, payload) => {
  console.log(payload);
  return {
    ...state,
    error: payload.error,
  };
};


export default createReducer(initialState, {
  [FETCH_FIELD_STRUCTURE_SUCCESS]: fieldStructureSuccessReducer,
  [FETCH_FIELD_STRUCTURE_FAIL]: fieldStructureFailReducer
});
