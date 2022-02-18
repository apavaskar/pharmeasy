import {
  MASTER_SYNC_FAIL,
  MASTER_SYNC_START,
  MASTER_SYNC_SUCCESS,
  SYNC_NOW_FAIL,
  SYNC_NOW_START,
  SYNC_NOW_SUCCESS,
} from './actionConstants';
import {showErrorMessage, showSuccessMessage} from '../../widgets/showMessage';

export const masterSyncStartAction = payload => dispatch => {
  dispatch({
    type: MASTER_SYNC_START,
    payload: payload,
  });
};

export const masterSyncSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Masters synced successfully',
  });
  dispatch({
    type: MASTER_SYNC_SUCCESS,
    payload: payload,
  });
};

export const masterSyncFailAction = payload => dispatch => {
  showErrorMessage({
    message: `Error in syncing masters, please try again later. ${payload.error}`,
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: MASTER_SYNC_FAIL,
    payload: payload,
  });
};

export const syncNowStartAction = payload => dispatch => {
  dispatch({
    type: SYNC_NOW_START,
    payload: payload,
  });
};

export const syncNowSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Completed syncing',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: SYNC_NOW_SUCCESS,
    payload: payload,
  });
};

export const syncNowFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to Sync data',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: SYNC_NOW_FAIL,
    payload: payload,
  });
};
