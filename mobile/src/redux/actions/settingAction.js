import {
  INIT_SETTINGS_VIEW_FAIL,
  INIT_SETTINGS_VIEW_START,
  INIT_SETTINGS_VIEW_SUCCESS,
} from './actionConstants';
import {showErrorMessage, showSuccessMessage} from '../../widgets/showMessage';

export const initSettingViewStartAction = payload => dispatch => {
  dispatch({
    type: INIT_SETTINGS_VIEW_START,
    payload: payload,
  });
};

export const initSettingViewSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Settings loaded successfully',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: INIT_SETTINGS_VIEW_SUCCESS,
    payload: payload,
  });
};

export const initSettingViewFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to load settings',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: INIT_SETTINGS_VIEW_FAIL,
    payload: payload,
  });
};
