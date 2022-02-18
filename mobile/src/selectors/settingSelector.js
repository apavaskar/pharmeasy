import {createSelector} from 'reselect';

const settings = state => state.settings;
const lastSyncLog = state => state.settings.lastSyncLog;

export const lastSyncLogSelector = createSelector(
  lastSyncLog,
  lastSyncLogSelection => lastSyncLogSelection,
);
