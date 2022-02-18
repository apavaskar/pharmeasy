import {createReducer} from '../reducerUtils';
import {
  SINGLE_RCPA_CHANGE_FAIL,
  SINGLE_RCPA_CHANGE_SUCCESS,
  SINGLE_RCPA_INIT_FAIL,
  SINGLE_RCPA_INIT_SUCCESS,
} from '../../actions/rcpa/rcpaActionConstants';

const initialState = {
  visitId: {},
  allChemists: [],
  allBrands: [],
  rcpaHistory: {prevRCPA: [], currentRCPA: []},
  error: {},
};

const singleRCPAInitSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    allChemists: payload.allChemists,
    allBrands: payload.allBrands,
    rcpaHistory: payload.rcpaHistory || {prevRCPA: [], currentRCPA: []},
    visitId: payload.visitId,
  };
};

const singleRCPAInitFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const rcpaChangeSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    rcpaHistory: {
      currentRCPA: [...state.rcpaHistory.currentRCPA, ...payload.currentValues],
      prevRCPA: state.rcpaHistory.prevRCPA,
    },
  };
};

const rcpaChangeFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

const deleteRCPASuccessReducer = (state = initialState, payload) => {
  const rcpa = payload.rcpa;
  const rcpas = state.rcpaHistory.currentRCPA.map(r => {
    if (rcpa.id === r.id) {
      return rcpa;
    }
    return r;
  });
  return {
    ...state,
    rcpaHistory: {
      currentRCPA: rcpas,
      prevRCPA: state.rcpaHistory.prevRCPA,
    },
  };
};

const deleteRCPAFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

export default createReducer(initialState, {
  [SINGLE_RCPA_INIT_SUCCESS]: singleRCPAInitSuccessReducer,
  [SINGLE_RCPA_INIT_FAIL]: singleRCPAInitFailReducer,
  [SINGLE_RCPA_CHANGE_SUCCESS]: rcpaChangeSuccessReducer,
  [SINGLE_RCPA_CHANGE_FAIL]: rcpaChangeFailReducer,
});
