import {
  INIT_VISIT_COMMENTS_FAIL,
  INIT_VISIT_COMMENTS_START,
  INIT_VISIT_COMMENTS_SUCCESS,
  INIT_VISIT_DETAILS_FAIL,
  INIT_VISIT_DETAILS_START,
  INIT_VISIT_DETAILS_SUCCESS,
  RESET_CALL_FAIL,
  RESET_CALL_START,
  RESET_CALL_SUCCESS,
  SAVE_DOCTOR_COORDINATES_FAIL,
  SAVE_DOCTOR_COORDINATES_START,
  SAVE_DOCTOR_COORDINATES_SUCCESS,
  SAVE_VISIT_TO_DB_END,
  SAVE_VISIT_TO_DB_START,
  SAVE_VISIT_TO_DB_SUCCESS,
} from './callReportingActionConstants';
import {
  showErrorMessage,
  showSuccessMessage,
} from '../../../widgets/showMessage';
import {NavigationActions} from 'react-navigation';

export const initVisitDetailsStartAction = payload => dispatch => {
  dispatch({
    type: INIT_VISIT_DETAILS_START,
    payload: payload,
  });
};

export const initVisitDetailsSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Visit details fetched successfully',
  });
  dispatch({
    type: INIT_VISIT_DETAILS_SUCCESS,
    payload: payload,
  });
};

export const initVisitDetailsFailAction = payload => dispatch => {
  showErrorMessage({
    message: `Fetching Visit details failed, ${payload.error.message}`,
  });
  dispatch({
    type: INIT_VISIT_DETAILS_FAIL,
    payload: payload,
  });
};

export const saveVisitToLocalStartAction = payload => dispatch => {
  dispatch({
    type: SAVE_VISIT_TO_DB_START,
    payload: payload,
  });
};

export const saveVisitToLocalSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Saved Visit successfully',
  });
  dispatch({
    type: SAVE_VISIT_TO_DB_SUCCESS,
    payload: payload,
  });
  NavigationActions.navigate('CallReportingListComponent');
};

export const saveVisitToLocalFailAction = payload => dispatch => {
  showErrorMessage({
    message: `Failed to save visit, ${payload.error.message}`,
  });
  dispatch({
    type: SAVE_VISIT_TO_DB_END,
    payload: payload,
  });
};

export const saveDoctorCoordinatesStartAction = payload => dispatch => {
  dispatch({
    type: SAVE_DOCTOR_COORDINATES_START,
    payload: payload,
  });
};

export const saveDoctorCoordinatesSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Saved Location successfully',
  });
  dispatch({
    type: SAVE_DOCTOR_COORDINATES_SUCCESS,
    payload: payload,
  });
  NavigationActions.navigate('CallReportingListComponent');
};

export const saveDoctorCoordinatesFailAction = payload => dispatch => {
  showErrorMessage({
    message: `Failed to save visit, ${payload.error.message}`,
  });
  dispatch({
    type: SAVE_DOCTOR_COORDINATES_FAIL,
    payload: payload,
  });
};

export const initVisitCommentsStartAction = payload => dispatch => {
  dispatch({
    type: INIT_VISIT_COMMENTS_START,
    payload: payload,
  });
};

export const initVisitCommentsSuccessAction = payload => dispatch => {
  dispatch({
    type: INIT_VISIT_COMMENTS_SUCCESS,
    payload: payload,
  });
  NavigationActions.navigate('CallReportingListComponent');
};

export const initVisitCommentsFailAction = payload => dispatch => {
  dispatch({
    type: INIT_VISIT_COMMENTS_FAIL,
    payload: payload,
  });
};

export const resetCallStartAction = payload => dispatch => {
  dispatch({
    type: RESET_CALL_START,
    payload: payload,
  });
};

export const resetCallSuccessAction = payload => dispatch => {
  dispatch({
    type: RESET_CALL_SUCCESS,
    payload: payload,
  });
  NavigationActions.navigate('CallReportingListComponent');
};

export const resetCallFailAction = payload => dispatch => {
  dispatch({
    type: RESET_CALL_FAIL,
    payload: payload,
  });
};
