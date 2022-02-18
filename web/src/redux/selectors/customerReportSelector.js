import { createSelector } from 'reselect';

const dml = state => state.dmlReport;
const refreshDML =state => state.dmlReport.refresh

export const selectDMLData = createSelector(
    dml,
        dataSelection => dataSelection  );

export const selectRefreshDMLReport = createSelector(
    refreshDML,
    refreshSelection => refreshSelection
);
