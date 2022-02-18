import {BG_SYNC_FAIL, BG_SYNC_START, BG_SYNC_SUCCESS} from './actionConstants';
import {showErrorMessage, showSuccessMessage} from '../../widgets/showMessage';

export const backgroundSyncStartAction = payload => dispatch => {
  dispatch({
    type: BG_SYNC_START,
    payload: payload,
  });
};

export const backgroundSyncSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Successfully synced',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: BG_SYNC_SUCCESS,
    payload: payload,
  });
};

export const backgroundSyncFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to Sync',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: BG_SYNC_FAIL,
    payload: payload,
  });
};
