import {
  showErrorMessage,
  showSuccessMessage,
} from '../../../widgets/showMessage';
import {
  TROUBLESHOOT_INIT_FAIL,
  TROUBLESHOOT_INIT_START,
  TROUBLESHOOT_INIT_SUCCESS,
} from './troubleShootActionConstants';

export const troubleShootStartAction = payload => dispatch => {
  dispatch({
    type: TROUBLESHOOT_INIT_START,
    payload: payload,
  });
};

export const troubleShootSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Sentdata successfullu',
  });
  dispatch({
    type: TROUBLESHOOT_INIT_SUCCESS,
    payload: payload,
  });
};

export const troubleShootFailAction = payload => dispatch => {
  console.log(payload);
  showErrorMessage({
    message: 'Failed to send data',
  });
  dispatch({
    type: TROUBLESHOOT_INIT_FAIL,
    payload: payload,
  });
};
