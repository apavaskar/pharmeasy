import {
  showErrorMessage,
  showSuccessMessage,
} from '../../../widgets/showMessage';
import {
  DISTRIBUTE_INPUT_FAIL,
  DISTRIBUTE_INPUT_START,
  DISTRIBUTE_INPUT_SUCCESS,
  INIT_INPUT_DISTRIBUTION_FAIL,
  INIT_INPUT_DISTRIBUTION_START,
  INIT_INPUT_DISTRIBUTION_SUCCESS,
  INIT_INPUT_INVENTORY_FAIL,
  INIT_INPUT_INVENTORY_START,
  INIT_INPUT_INVENTORY_SUCCESS,
  SAVE_INPUT_TO_STATE_START,
} from './inputDetailingActionConstants';

export const inputInventoryStartAction = payload => dispatch => {
  dispatch({
    type: INIT_INPUT_INVENTORY_START,
    payload: payload,
  });
};

export const inputInventorySuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Loaded all the inputs',
  });
  dispatch({
    type: INIT_INPUT_INVENTORY_SUCCESS,
    payload: payload,
  });
};

export const inputInventoryFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to load Inputs List',
  });
  dispatch({
    type: INIT_INPUT_INVENTORY_FAIL,
    payload: payload,
  });
};

export const distributeInputStartAction = payload => dispatch => {
  dispatch({
    type: DISTRIBUTE_INPUT_START,
    payload: payload,
  });
};

export const distributeInputSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Inputs updated successfully',
  });
  dispatch({
    type: DISTRIBUTE_INPUT_SUCCESS,
    payload: payload,
  });
};

export const distributeInputFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to distribute inputs',
  });
  dispatch({
    type: DISTRIBUTE_INPUT_FAIL,
    payload: payload,
  });
};

export const saveInputsToStateStartAction = payload => dispatch => {
  dispatch({
    type: SAVE_INPUT_TO_STATE_START,
    payload: payload,
  });
};

export const initInputDistributionStartAction = payload => dispatch => {
  dispatch({
    type: INIT_INPUT_DISTRIBUTION_START,
    payload: payload,
  });
};

export const initInputDistributionSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Loaded distributed inputs',
  });
  dispatch({
    type: INIT_INPUT_DISTRIBUTION_SUCCESS,
    payload: payload,
  });
};

export const initInputDistributionFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to load inputs',
  });
  dispatch({
    type: INIT_INPUT_DISTRIBUTION_FAIL,
    payload: payload,
  });
};
