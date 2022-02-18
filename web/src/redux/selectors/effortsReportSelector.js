import { createSelector } from 'reselect';

const data = state => state.effortsReport.effortData;
const dailyEffortData = state => state.effortsReport.dailyEffortData;
const doctorVisitData = state => state.effortsReport.doctorVisitData;
const deviationData = state => state.effortsReport.deviationData;
const refresh =state => state.effortsReport.refresh;

export const selectEffortData = createSelector(
    data,
        dataSelection => dataSelection  );

export const selectRefreshEffortReport = createSelector(
    refresh,
    refreshSelection => refreshSelection
);

export const selectDailyEffortData = createSelector(
    dailyEffortData,
        dataSelection => dataSelection  );

export const selectRefreshDailyEffortReport = createSelector(
    refresh,
    refreshSelection => refreshSelection
);

export const selectDoctorVisitData = createSelector(
    doctorVisitData,
        dataSelection => dataSelection  );

export const selectRefreshDoctorVisitReport = createSelector(
    refresh,
    refreshSelection => refreshSelection
);

export const selectDeviationReport = createSelector(
    deviationData,
        deviationDataSelection => deviationDataSelection
)
