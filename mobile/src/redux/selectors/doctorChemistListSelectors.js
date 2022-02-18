import {createSelector} from 'reselect';

const doctorChemist = state => state.doctorChemist;
const doctorList = state => state.doctorChemist.doctorList;
const specialities = state => state.doctorChemist.specialities;
const beats = state => state.doctorChemist.beats;
const saved = state => state.doctorChemist.saved;

export const doctorChemistListSelector = createSelector(
  doctorList,
  doctorChemistListSelection => doctorChemistListSelection,
);

export const mappedSpecialitiesSelector = createSelector(
  specialities,
  specialitiesSelection => specialitiesSelection,
);

export const beatsSelector = createSelector(
  beats,
  beatsSelection => beatsSelection,
);

export const savedSelector = createSelector(
  saved,
  saveSelection => saveSelection,
);
