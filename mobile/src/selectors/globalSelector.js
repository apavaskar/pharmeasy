import {createSelector} from 'reselect';

const showSpinner = state => state.global.showSpinner;

export const selectShowSpinner = createSelector(
  showSpinner,
  showSpinnerSelect => showSpinnerSelect,
);
