import {createSelector} from 'reselect';

const marketingActivity = state => state.marketingActivity;
const brands = state => state.marketingActivity.brands;
const doctors = state => state.marketingActivity.doctors;

export const brandsForMarketingSelector = createSelector(
  brands,
  brandsForMarketingSelection => brandsForMarketingSelection,
);

export const doctorsForMarketingSelector = createSelector(
  doctors,
  doctorsSelection => doctorsSelection,
);
