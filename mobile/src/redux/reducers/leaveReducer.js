import {createReducer} from './reducerUtils';
import {
  INIT_LEAVE_FAIL,
  INIT_LEAVE_SUCCESS,
  LEAVE_APPLY_FAIL,
  LEAVE_APPLY_SUCCESS,
} from '../actions/actionConstants';

const initialState = {
  leaveTypes: [],
  error: {},
};

export const initLeavesSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    leaveTypes: payload.leaveTypes,
  };
};

export const initLeaveFailAction = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

export const applyLeaveSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
  };
};

export const applyLeaveFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

export default createReducer(initialState, {
  [INIT_LEAVE_SUCCESS]: initLeavesSuccessReducer,
  [INIT_LEAVE_FAIL]: initLeaveFailAction,
  [LEAVE_APPLY_SUCCESS]: applyLeaveSuccessReducer,
  [LEAVE_APPLY_FAIL]: applyLeaveFailReducer,
});
