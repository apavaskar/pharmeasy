import { createReducer } from './reducerUtils';
import {FETCH_FIELD_STRUCTURE_FAIL, FETCH_FIELD_STRUCTURE_SUCCESS} from "../actions/reports/fieldStructure/fieldStructureActionConstants";
import {FETCH_DML_REPORT_FAIL, FETCH_DML_REPORT_SUCCESS} from "../actions/reports/customer/customerReportActionConstants";
const initialState = {
  dml: [],
  division: {},
  refresh: new Date(),
  error: {}
};

const dmlSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
      division: payload.division,
      dml: payload.dmlData,
      refresh: new Date()
  };
};

const dmlFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    dml: [],
    error: payload.error,
  };
};


export default createReducer(initialState, {
  [FETCH_DML_REPORT_SUCCESS]: dmlSuccessReducer,
  [FETCH_DML_REPORT_FAIL]: dmlFailReducer
});
