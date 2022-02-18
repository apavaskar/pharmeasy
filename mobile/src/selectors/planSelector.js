import {createSelector} from 'reselect';

const plan = state => state.plan;
const doctorsForDate = state => state.plan.activities;
const planSummary = state => state.plan.planSummary;
const planDate = state => state.plan.planDate;
const refreshSummary = state => state.plan.refreshSummary;
const currentAction = state => state.plan.currentAction;
const allNonCallActivities = state => state.plan.allNonCallActivities;
const plannedNonCallActivities = state => state.plan.plannedNonCallActivities;
const beatsPlanned = state => state.plan.beatsPlanned;
const plannedLocations = state => state.plan.plannedLocationIds;
const refreshDoctorList = state => state.plan.refreshDoctorList;

export const doctorsForDateSelector = createSelector(
  doctorsForDate,
  doctorsForDateSelection => doctorsForDateSelection,
);

export const plannedLocationsSelector = createSelector(
  plannedLocations,
  plannedLocationsSelection => plannedLocationsSelection,
);

export const planSummarySelector = createSelector(
  planSummary,
  planSummarySelection => planSummarySelection,
);

export const planDateSelector = createSelector(
  planDate,
  planDateSelection => planDateSelection,
);

export const refreshSummarySelector = createSelector(
  refreshSummary,
  refreshSummarySelection => refreshSummarySelection,
);

export const currentActionSelector = createSelector(
  currentAction,
  currentActionSelection => currentActionSelection,
);

export const allNonCallActivitiesSelector = createSelector(
  allNonCallActivities,
  allNonCallActivitiesSelection => allNonCallActivitiesSelection,
);

export const plannedNonCallActivitiesSelector = createSelector(
  plannedNonCallActivities,
  plannedNonCallActivitiesSelection => plannedNonCallActivitiesSelection,
);

export const beatsPlannedSelector = createSelector(
  beatsPlanned,
  beatsPlannedSelection => beatsPlannedSelection,
);

export const refreshDoctorListSelector = createSelector(
  refreshDoctorList,
  refreshDoctorListSelection => refreshDoctorListSelection,
);
