import {
  LOAD_MY_TEAM_PLAN_FAIL,
  LOAD_MY_TEAM_PLAN_START,
  LOAD_MY_TEAM_PLAN_SUCCESS,
} from './actionConstants';
import {showErrorMessage, showSuccessMessage} from '../../widgets/showMessage';

export const loadMyTeamPlanStartAction = payload => dispatch => {
  dispatch({
    type: LOAD_MY_TEAM_PLAN_START,
    payload: payload,
  });
};

export const loadMyTeamPlanSuccessAction = payload => dispatch => {
  showSuccessMessage({
    message: 'Loaded my teams plan',
    type: 'success',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: LOAD_MY_TEAM_PLAN_SUCCESS,
    payload: payload,
  });
};

export const loadMyTeamPlanFailAction = payload => dispatch => {
  showErrorMessage({
    message: 'Failed to load my teams plan',
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    duration: 2000,
  });
  dispatch({
    type: LOAD_MY_TEAM_PLAN_FAIL,
    payload: payload,
  });
};
