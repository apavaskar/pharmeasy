import {
  showErrorMessage,
  showSuccessMessage,
} from '../../../widgets/showMessage';
import {
  LOAD_CONFIGS_FAIL,
  LOAD_CONFIGS_START,
  LOAD_CONFIGS_SUCCESS,
} from './ConfigActionConstants';

export const loadConfigStartAction = payload => dispatch => {
  dispatch({
    type: LOAD_CONFIGS_START,
    payload: payload,
  });
};

export const loadConfigSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Loaded the menus',
  });
  dispatch({
    type: LOAD_CONFIGS_SUCCESS,
    payload: payload,
  });
};

export const loadConfigFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to load drawer',
  });
  dispatch({
    type: LOAD_CONFIGS_FAIL,
    payload: payload,
  });
};
