import {createSelector} from 'reselect';

const digitalCall = state => state.digitalCall;
const allBrands = state => state.digitalCall.allBrands;
const allTemplates = state => state.digitalCall.allTemplates;

export const digitalCallSelector = createSelector(
  digitalCall,
  digitalCallSelection => digitalCallSelection,
);

export const digitalCallBrandsSelector = createSelector(
  allBrands,
  allBrandsSelection => allBrandsSelection,
);

export const allTemplatesSelector = createSelector(
  allTemplates,
  allTemplatesSelection => allTemplatesSelection,
);
