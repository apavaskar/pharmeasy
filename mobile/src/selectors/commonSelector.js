import {createSelector} from 'reselect';

const common = state => state.common;
const employee = state => state.common.employee;
const beats = state => state.common.beats;
const doctors = state => state.common.doctors;

export const employeeSelector = createSelector(
  employee,
  employeeSelection => employeeSelection,
);

export const beatsSelector = createSelector(
  beats,
  beatsSelection => beatsSelection,
);

export const doctorsSelector = createSelector(
  doctors,
  doctorsSelection => doctorsSelection,
);
