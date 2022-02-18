import {createSelector} from 'reselect';
const edetailingBrandList = state => state.edetailingBrandList;
const brands = state => state.edetailingBrandList.brandList;
const refreshList = state => state.edetailingBrandList.refreshList;
const downloadingVA = state => state.edetailingBrandList.downloadingVA;

export const brandForEdetailingSelector = createSelector(
  brands,
  brandsSelection => brandsSelection,
);

export const refreshListSelector = createSelector(
  refreshList,
  refreshListSelection => refreshListSelection,
);

export const downloadVASelector = createSelector(
  downloadingVA,
  downloadingVASelection => downloadingVASelection,
);
