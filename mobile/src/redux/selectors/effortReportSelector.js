import {createSelector} from 'reselect';

const effortReport = state => state.effortReport;

export const effortReportSelector = createSelector(
  effortReport,
  effortReportSelection => effortReportSelection,
);
