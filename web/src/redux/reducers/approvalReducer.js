import { PROFILE_FETCHED_FAIL, PROFILE_FETCHED_SUCCESS } from '../actions/profile/profileActionConstants';
import { createReducer } from './reducerUtils';
import {LOGIN_FAIL} from "../actions/auth/authActionConstants";
import {INIT_APPROVAL_FAIL, INIT_APPROVAL_SUCCESS} from "../actions/common/approvalActionConstants";
const initialState = {
    approvals: [],
  error: {}
};

const initApprovalSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    approvals: payload.requests
  };
};

const initApprovalFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

export default createReducer(initialState, {
  [INIT_APPROVAL_SUCCESS]: initApprovalSuccessReducer,
  [INIT_APPROVAL_FAIL]: initApprovalFailReducer,

});
