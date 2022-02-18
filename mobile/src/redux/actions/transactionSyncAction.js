import {
  TRANSACTION_SYNC_FAIL,
  TRANSACTION_SYNC_START,
  TRANSACTION_SYNC_SUCCESS,
} from './actionConstants';
import {showErrorMessage, showSuccessMessage} from '../../widgets/showMessage';

export const transactionDataSyncStartAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Started Syncing your transactions',
  });
  dispatch({
    type: TRANSACTION_SYNC_START,
    payload: payload,
  });
};

export const transactionDataSyncSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Successfully synced data',
  });
  dispatch({
    type: TRANSACTION_SYNC_SUCCESS,
    payload: payload,
  });
};

export const transactionDataSyncFailAction = payload => dispatch => {
  console.log(payload);
  showErrorMessage({
    message: 'Failed to sync transaction data',
  });
  dispatch({
    type: TRANSACTION_SYNC_FAIL,
    payload: payload,
  });
};
