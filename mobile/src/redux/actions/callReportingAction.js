import {
  CHANGE_CALL_TYPE_LIST_FAIL,
  CHANGE_CALL_TYPE_LIST_START,
  CHANGE_CALL_TYPE_LIST_SUCCESS,
  DELETE_RCPA_FAIL,
  DELETE_RCPA_START,
  DELETE_RCPA_SUCCESS,
  DISTRIBUTE_INPUT_FAIL,
  DISTRIBUTE_INPUT_START,
  DISTRIBUTE_INPUT_SUCCESS,
  HANDLE_PHYSICAL_DIGITAL_SWITCH_FAIL,
  HANDLE_PHYSICAL_DIGITAL_SWITCH_START,
  HANDLE_PHYSICAL_DIGITAL_SWITCH_SUCCESS,
  INIT_INPUT_INVENTORY_FAIL,
  INIT_INPUT_INVENTORY_START,
  INIT_INPUT_INVENTORY_SUCCESS,
  LOAD_MASTERS_FOR_MKT_FAIL,
  LOAD_MASTERS_FOR_MKT_START,
  LOAD_MASTERS_FOR_MKT_SUCCESS,
  RCPA_CHANGE_FAIL,
  RCPA_CHANGE_START,
  RCPA_CHANGE_SUCCESS,
  SAVE_NON_CALL_FAIL,
  SAVE_NON_CALL_START,
  SAVE_NON_CALL_SUCCESS,
  SAVE_VISIT_DATA_FAIL,
  SAVE_VISIT_DATA_START,
  SAVE_VISIT_DATA_SUCCESS,
} from './actionConstants';
import {showErrorMessage, showSuccessMessage} from '../../widgets/showMessage';
import {
  CHANGE_CALL_STEP,
  SET_JOINEES,
} from './callReporting/callReportingActionConstants';

export const changeCallStepAction = payload => dispatch => {
  dispatch({
    type: CHANGE_CALL_STEP,
    payload: payload,
  });
};

export const handlePhysicalDigitalSwitchStartAction = payload => dispatch => {
  dispatch({
    type: HANDLE_PHYSICAL_DIGITAL_SWITCH_START,
    payload: payload,
  });
};

export const handlePhysicalDigitalSwitchSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Switched the reporting mode',
  });
  dispatch({
    type: HANDLE_PHYSICAL_DIGITAL_SWITCH_SUCCESS,
    payload: payload,
  });
};

export const handlePhysicalDigitalSwitchFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to change the reporting mode',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: HANDLE_PHYSICAL_DIGITAL_SWITCH_FAIL,
    payload: payload,
  });
};

export const rcpaValueChangeStartAction = payload => dispatch => {
  dispatch({
    type: RCPA_CHANGE_START,
    payload: payload,
  });
};

export const rcpaValueChangeSuccessAction = payload => dispatch => {
  dispatch({
    type: RCPA_CHANGE_SUCCESS,
    payload: payload,
  });
};

export const rcpaValueChangeFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to fetch value for the brand',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: RCPA_CHANGE_FAIL,
    payload: payload,
  });
};
/*
export const saveVisitToLocalStartAction = payload => dispatch => {
  dispatch({
    type: SAVE_VISIT_DATA_START,
    payload: payload,
  });
};

export const saveVisitToLocalSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Visit Saved Successfully',
  });
  dispatch({
    type: SAVE_VISIT_DATA_SUCCESS,
    payload: payload,
  });
};

export const saveVisitToLocalFailAction = payload => dispatch => {
  console.log(payload);
  showMessage({
    message: `Failed to save visit, ${payload.error.message}`,
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: SAVE_VISIT_DATA_FAIL,
    payload: payload,
  });
};
*/
export const changeCallTypeListStartAction = payload => dispatch => {
  dispatch({
    type: CHANGE_CALL_TYPE_LIST_START,
    payload: payload,
  });
};

export const changeCallTypeListSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Changed the Listing successfully',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: CHANGE_CALL_TYPE_LIST_SUCCESS,
    payload: payload,
  });
};

export const changeCallTypeListFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to change the listing',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: CHANGE_CALL_TYPE_LIST_FAIL,
    payload: payload,
  });
};

export const saveNonCallStartAction = payload => dispatch => {
  dispatch({
    type: SAVE_NON_CALL_START,
    payload: payload,
  });
};

export const saveNonCallSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'NonCall Activity Saved',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: SAVE_NON_CALL_SUCCESS,
    payload: payload,
  });
};

export const saveNonCallFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to save NonCall Activity',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: SAVE_NON_CALL_FAIL,
    payload: payload,
  });
};

export const setJoineeAction = payload => dispatch => {
  dispatch({
    type: SET_JOINEES,
    payload: payload,
  });
};

export const deleteRCPAStartAction = payload => dispatch => {
  dispatch({
    type: DELETE_RCPA_START,
    payload: payload,
  });
};

export const deleteRCPASuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'RCPA Removed successfully',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: DELETE_RCPA_SUCCESS,
    payload: payload,
  });
};

export const deleteRCPAFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to remove the RCPA entry',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: DELETE_RCPA_FAIL,
    payload: payload,
  });
};

export const loadMastersForMkStartAction = payload => dispatch => {
  dispatch({
    type: LOAD_MASTERS_FOR_MKT_START,
    payload: payload,
  });
};

export const loadMastersForMkSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Loaded Activity masters',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: LOAD_MASTERS_FOR_MKT_SUCCESS,
    payload: payload,
  });
};

export const loadMastersForMkFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to load masters',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: LOAD_MASTERS_FOR_MKT_FAIL,
    payload: payload,
  });
};
