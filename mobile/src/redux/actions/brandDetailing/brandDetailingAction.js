import {
  showErrorMessage,
  showSuccessMessage,
} from '../../../widgets/showMessage';
import {
  BD_INIT_FAIL,
  BD_INIT_START,
  BD_INIT_SUCCESS,
  BD_SAVE_STATE_START,
} from './brandDetailingActionConstants';

export const bdInitStartAction = payload => dispatch => {
  dispatch({
    type: BD_INIT_START,
    payload: payload,
  });
};

export const bdInitSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Loaded the detailing',
  });
  dispatch({
    type: BD_INIT_SUCCESS,
    payload: payload,
  });
};

export const bdInitFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to load detailing',
  });
  dispatch({
    type: BD_INIT_FAIL,
    payload: payload,
  });
};

export const bdSaveStateStartAction = payload => dispatch => {
  dispatch({
    type: BD_SAVE_STATE_START,
    payload: payload,
  });
};
