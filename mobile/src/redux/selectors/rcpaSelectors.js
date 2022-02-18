import {createSelector} from 'reselect';

const rcpa = state => state.rcpa;
const allChemists = state => state.rcpa.allChemists;
const allBrands = state => state.rcpa.allBrands;
const rcpaHistory = state => state.rcpa.rcpaHistory;

export const rcpaAllChemistsSelector = createSelector(
  allChemists,
  allChemistsSelection => allChemistsSelection,
);

export const rcpaAllBrandsSelector = createSelector(
  allBrands,
  allBrandsSelection => allBrandsSelection,
);

export const rcpaHistorySelector = createSelector(
  rcpaHistory,
  rcpaHistorySelection => rcpaHistorySelection,
);
