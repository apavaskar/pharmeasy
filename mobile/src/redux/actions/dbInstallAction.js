import {
  RUN_DB_INSTALL_FAIL,
  RUN_DB_INSTALL_START,
  RUN_DB_INSTALL_SUCCESS,
} from './actionConstants';
import {showErrorMessage, showSuccessMessage} from '../../widgets/showMessage';

export const dbInstallStartAction = payload => dispatch => {
  dispatch({
    type: RUN_DB_INSTALL_START,
    payload: payload,
  });
};

export const dbInstallSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Local store setup successfully',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: RUN_DB_INSTALL_SUCCESS,
    payload: payload,
  });
};

export const dbInstallFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Local store',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: RUN_DB_INSTALL_FAIL,
    payload: payload,
  });
};
