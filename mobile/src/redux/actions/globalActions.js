import {HIDE_SPINNER, SHOW_SPINNER} from './actionConstants';

export const showSpinner = () => dispatch => {
  dispatch({
    type: SHOW_SPINNER,
  });
};

export const hideSpinner = () => dispatch => {
  dispatch({
    type: HIDE_SPINNER,
  });
};
