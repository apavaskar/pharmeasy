import {createSelector} from 'reselect';

const leave = state => state.leave;
const leaveTypes = state => state.leave.leaveTypes;

export const leaveTypesSelector = createSelector(
  leaveTypes,
  leaveTypesSelection => leaveTypesSelection,
);
