import {createReducer} from './reducerUtils';
import {
  TRANSACTION_SYNC_FAIL,
  TRANSACTION_SYNC_SUCCESS,
} from '../actions/actionConstants';
import {toTimeStamp} from '../../utils/dateUtil';

const initialState = {
  transactionSyncTime: '',
  error: {},
};

const transactionSyncSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    transactionSyncTime: toTimeStamp(new Date()),
  };
};

const transactionSyncFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  };
};

export default createReducer(initialState, {
  [TRANSACTION_SYNC_SUCCESS]: transactionSyncSuccessReducer,
  [TRANSACTION_SYNC_FAIL]: transactionSyncFailReducer,
});
