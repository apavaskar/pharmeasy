import {createSelector} from 'reselect';

const brandDetailing = state => state.brandDetailing;
const allBrands = state => state.brandDetailing.allBrands;
const brandsDetailed = state => state.brandDetailing.brandsDetailed;

export const bdAllBrandsSelector = createSelector(
  allBrands,
  allBrandsSelection => allBrandsSelection,
);

export const bdBrandsDetailedSelector = createSelector(
  brandsDetailed,
  brandsDetailedSelection => brandsDetailedSelection,
);
