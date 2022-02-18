import { createSelector } from 'reselect';

const activities = (state) => state.newExpense.activities;
const masters = state => state.newExpense.masters;
const summary = state => state.newExpense.summary;
const profiles = state => state.newExpense.profilesByDate;
const transient = state => state.newExpense.transient;
const refreshExpenses = state => state.newExpense.refreshExpenses;
const refreshMisc = state => state.newExpense.refreshMisc;
const showRouteSelector = state => state.newExpense.showRouteSelector;
const showTransitSelector = state => state.newExpense.showTransitSelector;
const documents = state => state.newExpense.documents;
const refreshTransient = state => state.newExpense.refreshTransient;
const location = state=> state.newExpense.location;


export const selectExpenseActivities = createSelector(
    activities,
    activitiesSelection => activitiesSelection  );

export const selectExpensesMasters = createSelector(
    masters,
        masterSelection => masterSelection
);

export const selectExpenseSummary = createSelector (
    summary,
        summarySelection => summarySelection
)

export const selectExpenseProfile = createSelector(
    profiles,
        profilesSelection => profilesSelection
)

export const selectTransientExpense = createSelector(
    transient,
    transientSelection => transientSelection
)

export const selectRefreshExpense = createSelector(
    refreshExpenses,
    refreshExpensesSelection => refreshExpensesSelection
)

export const selectShowRouteSelector = createSelector(
    showRouteSelector,
        showRouteSelectorSelection => showRouteSelectorSelection
)

export const selectShowTransitSelector = createSelector(
    showTransitSelector,
    showTransitSelectorSelection => showTransitSelectorSelection
)

export const selectRefreshMisc = createSelector(
    refreshMisc,
    refreshMiscSelection => refreshMiscSelection
)

export const selectDocuments = createSelector(
  documents,
    documentsSelection => documentsSelection
);

export const selectRefreshTransient = createSelector(
    refreshTransient,
    refreshTransientSelection => refreshTransientSelection
)

export const selectExpenseLocation = createSelector(
    location,
        locationSelection => locationSelection
)
