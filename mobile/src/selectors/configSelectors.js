import {createSelector} from 'reselect';

const configs = state => state.config;

export const configsSelector = createSelector(
  configs,
  configsSelection => configsSelection,
);
