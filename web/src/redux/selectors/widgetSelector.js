import { createSelector } from 'reselect';

const widget = (state) => state.widget;
const locations = (state) => state.widget.locationHeirarchy;
const divisions = (state) => state.widget.divisionList;
const locationDropdown = (state) => state.widget.locationDropDown;
const locationDropDownRefresh = (state) => state.widget.locationDropDownRefresh 

export const selectHeirarchyLocations = createSelector(
    locations,
    (locationsSelect) => locationsSelect,
);

export const selectDivisionList = createSelector(
    divisions,
    divisionSelect => divisionSelect
)

export const selectLocationDropdown = createSelector(
    locationDropdown,
    locationDropdownSelect => locationDropdownSelect
)

export const selectLocationDropDownRefresh = createSelector(
    locationDropDownRefresh,
    locationDropDownRefreshSelect => locationDropDownRefreshSelect
)
