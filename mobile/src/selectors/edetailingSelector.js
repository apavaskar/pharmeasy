import {createSelector} from 'reselect';

const edetailing = state => state.edetailing;
const thumbnails = state => state.edetailing.thumbnails;
const files = state => state.edetailing.files;
const brands = state => state.edetailing.brands;
const showDetailing = state => state.edetailing.showDetailing;

export const thumbnailsSelector = createSelector(
  thumbnails,
  thumbnailsSelection => thumbnailsSelection,
);

export const filesSelector = createSelector(
  files,
  filesSelection => filesSelection,
);

export const edetailingBrandsSelector = createSelector(
  brands,
  brandSelection => brandSelection,
);

export const showDetailingSelector = createSelector(
  showDetailing,
  showDetailingSelection => showDetailingSelection,
);
