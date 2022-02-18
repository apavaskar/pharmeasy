import {createSelector} from 'reselect';

const hospital = state => state.hospital;
const hospitals = state => state.hospital.hospitals;
const entries = state => state.hospital.entries;
const dailyEntry = state => state.hospital.dailyEntry;
const approvals = state => state.hospital.approvals;
const doctors = state => state.hospital.doctors;

export const hospitalsSelector = createSelector(
  hospitals,
  hospitalsSelection => hospitalsSelection,
);

export const hospitalEntriesSelector = createSelector(
  entries,
  entriesSelection => entriesSelection,
);

export const hospitalDailyEntrySelector = createSelector(
  dailyEntry,
  dailyEntrySelection => dailyEntrySelection,
);

export const hospitalDoctorsSelector = createSelector(
  doctors,
  doctorsSelection => doctorsSelection,
);
