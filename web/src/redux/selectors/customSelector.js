import { createSelector } from 'reselect';

const sfc = state => state.custom.sfcs;
const refresh = state => state.custom.refresh;
const townList = state => state.custom.towns;

export const selectSFCs = createSelector(sfc, (sfcSelect) => sfcSelect);
export const selectTowns = createSelector(townList, townsSelect => townsSelect);
export const selectRefresh = createSelector(refresh, (refreshSelect) => refreshSelect);
