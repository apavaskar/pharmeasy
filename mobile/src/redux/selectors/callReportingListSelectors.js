import {createSelector} from 'reselect';

const callReportingList = state => state.callReportingList;
const doctorsToReportList = state => state.callReportingList.doctorList;
const callListReportingDate = state => state.callReportingList.reportingDate;
const currentAction = state => state.callReportingList.currentAction;
const nonCallActivityList = state =>
  state.callReportingList.nonCallActivityList;
const refreshList = state => state.callReportingList.refreshList;

export const doctorsToReportListSelector = createSelector(
  doctorsToReportList,
  doctorsToReportListSelection => doctorsToReportListSelection,
);

export const callListReportingDateSelector = createSelector(
  callListReportingDate,
  callListReportingDateSelection => callListReportingDateSelection,
);

export const currentReportingListActionSelector = createSelector(
  currentAction,
  currentActionSelection => currentActionSelection,
);

export const currentReportingNCAListSelector = createSelector(
  nonCallActivityList,
  activityListSelection => activityListSelection,
);

export const refreshListSelector = createSelector(
  refreshList,
  refreshListSelection => refreshListSelection,
);
