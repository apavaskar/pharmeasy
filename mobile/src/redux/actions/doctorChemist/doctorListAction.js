import {
  INIT_DOCTOR_ADD_FAIL,
  INIT_DOCTOR_ADD_START,
  INIT_DOCTOR_ADD_SUCCESS,
  INIT_DOCTOR_LIST_FAIL,
  INIT_DOCTOR_LIST_START,
  INIT_DOCTOR_LIST_SUCCESS,
  SAVE_DOCTOR_FAIL,
  SAVE_DOCTOR_START,
  SAVE_DOCTOR_SUCCESS,
} from './doctorListActionConstant';
import {
  showErrorMessage,
  showSuccessMessage,
} from '../../../widgets/showMessage';
import {NavigationActions} from 'react-navigation';

export const initDoctorListStartAction = payload => dispatch => {
  dispatch({
    type: INIT_DOCTOR_LIST_START,
    payload: payload,
  });
};

export const initDoctorListSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Loaded the doctors',
  });
  dispatch({
    type: INIT_DOCTOR_LIST_SUCCESS,
    payload: payload,
  });
};

export const initDoctorListFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to load doctors',
  });
  dispatch({
    type: INIT_DOCTOR_LIST_FAIL,
    payload: payload,
  });
};

export const initDoctorAddStartAction = payload => dispatch => {
  dispatch({
    type: INIT_DOCTOR_ADD_START,
    payload: payload,
  });
};

export const initDoctorAddSuccessAction = payload => dispatch => {
  dispatch({
    type: INIT_DOCTOR_ADD_SUCCESS,
    payload: payload,
  });
};

export const initDoctorAddFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to load doctors',
  });
  dispatch({
    type: INIT_DOCTOR_ADD_FAIL,
    payload: payload,
  });
};

export const saveDoctorStartAction = payload => dispatch => {
  dispatch({
    type: SAVE_DOCTOR_START,
    payload: payload,
  });
};

export const saveDoctorSuccessAction = payload => dispatch => {
  showSuccessMessage({message: 'Doctor saved successfully'});
  dispatch({
    type: SAVE_DOCTOR_SUCCESS,
    payload: payload,
  });
  NavigationActions.navigate('DoctorChemistDoctorList');
};

export const saveDoctorFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to save Doctor',
  });
  dispatch({
    type: SAVE_DOCTOR_FAIL,
    payload: payload,
  });
};
