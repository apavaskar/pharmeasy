import {HIDE_SPINNER, INIT_DIVISON_LIST_DROPDOWN_FAIL, INIT_DIVISON_LIST_DROPDOWN_START, INIT_DIVISON_LIST_DROPDOWN_SUCCESS, INIT_LOCATION_DROPDOWN_FAIL, INIT_LOCATION_DROPDOWN_START, INIT_LOCATION_DROPDOWN_SUCCESS, INIT_LOCATION_HEIRARCHY_DROPDOWN_FAIL, INIT_LOCATION_HEIRARCHY_DROPDOWN_START, INIT_LOCATION_HEIRARCHY_DROPDOWN_SUCCESS, SHOW_SPINNER} from "./widgetActionConstants";

export const locationHeirarchyDropdownStartAction = payload => dispatch =>
{
    dispatch({
        type: INIT_LOCATION_HEIRARCHY_DROPDOWN_START,
        payload: payload,
    });
};

export const locationHeirarchyDropdownSuccessAction = payload => dispatch => {
    dispatch({
    type: INIT_LOCATION_HEIRARCHY_DROPDOWN_SUCCESS,
    payload: payload,
    });
};

export const locationHeirarchyDropdownFailAction = payload => dispatch => {
    dispatch({
    type: INIT_LOCATION_HEIRARCHY_DROPDOWN_FAIL,
    payload: payload,
});
};

export const divisionListDropdownStartAction = payload => dispatch =>
{
    dispatch({
        type: INIT_DIVISON_LIST_DROPDOWN_START,
        payload: payload,
    });
};

export const divisionListDropdownSuccessAction = payload => dispatch => {
    dispatch({
    type: INIT_DIVISON_LIST_DROPDOWN_SUCCESS,
    payload: payload,
    });
};

export const divisionListDropdownFailAction = payload => dispatch => {
    dispatch({
    type: INIT_DIVISON_LIST_DROPDOWN_FAIL,
    payload: payload,
});
};

export const showSpinner = () => dispatch => {
    dispatch({
        type: SHOW_SPINNER,
    });
};

export const hideSpinner = () => dispatch => {
    dispatch({
        type: HIDE_SPINNER,
    });
};

export const locationDropdownStartAction = payload => dispatch =>
{
    dispatch({
        type: INIT_LOCATION_DROPDOWN_START,
        payload: payload,
    });
};

export const locationDropdownSuccessAction = payload => dispatch => {
    dispatch({
        type: INIT_LOCATION_DROPDOWN_SUCCESS,
        payload: payload,
    });
};

export const locationDropdownFailAction = payload => dispatch => {
    dispatch({
        type: INIT_LOCATION_DROPDOWN_FAIL,
        payload: payload,
    });
};