import {createSelector} from 'reselect';

const dashboard = state => state.dashboard;
const yearMonth = state => state.dashboard.yearMonth;
const dailyHospitalSummary = state => state.dashboard.dailyHospitalSummary;
const monthlyHospitalSummary = state => state.dashboard.monthlyHospitalSummary;
const monthlyHospitalDetails = state => state.dashboard.monthlyHospitalDetails;
const dailyHospitalDetails = state => state.dashboard.dailyHospitalDetails;
const reloadHospitalSummary = state => state.dashboard.reloadHospitalSummary;
const reloadHospitalDetails = state => state.dashboard.reloadHospitalDetails;
const notifications = state => state.dashboard.notifications;
const productStages = state => state.dashboard.productStages;
const dailyCalls = state => state.dashboard.dailyCalls;

export const dashboardYearMonthSelector = createSelector(
  yearMonth,
  yearMonthSelection => yearMonthSelection,
);

export const dailyHospitalSummarySelector = createSelector(
  dailyHospitalSummary,
  dailyHospitalSummarySelection => dailyHospitalSummarySelection,
);

export const dailyHospitalDetailsSelector = createSelector(
  dailyHospitalDetails,
  dailyHospitalDetailsSelection => dailyHospitalDetailsSelection,
);

export const monthlyHospitalSummarySelector = createSelector(
  monthlyHospitalSummary,
  monthlyHospitalSummarySelection => monthlyHospitalSummarySelection,
);

export const monthlyHospitalDetailsSelector = createSelector(
  monthlyHospitalDetails,
  monthlyHospitalDetailsSelection => monthlyHospitalDetailsSelection,
);

export const reloadHospitalSummarySelector = createSelector(
  reloadHospitalSummary,
  reloadHospitalSummarySelection => reloadHospitalSummarySelection,
);

export const reloadHospitalDetailsSelector = createSelector(
  reloadHospitalDetails,
  reloadHospitalDetailsSelection => reloadHospitalDetailsSelection,
);

export const notificationsSelector = createSelector(
  notifications,
  notificationsSelection => notificationsSelection,
);

export const productStagesSelector = createSelector(
  productStages,
  productStagesSelection => productStagesSelection,
);

export const dailyCallsSelector = createSelector(
  dailyCalls,
  dailyCallSelection => dailyCallSelection,
);
