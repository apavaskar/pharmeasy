import {INIT_DIVISON_LIST_DROPDOWN_FAIL, INIT_DIVISON_LIST_DROPDOWN_SUCCESS, INIT_LOCATION_DROPDOWN_SUCCESS, INIT_LOCATION_HEIRARCHY_DROPDOWN_FAIL, INIT_LOCATION_HEIRARCHY_DROPDOWN_SUCCESS} from "../actions/widgets/widgetActionConstants";
import { createReducer } from "./reducerUtils";

const initialState = {
    locationHeirarchy: [],
    divisionList: [],
    locationDropDown: {},
    locationDropDownRefresh: new Date(),
    error: {}
}

const initLocationHeirarchySuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        locationHeirarchy: payload.locations
    }
}

const initLocationHeirarchyFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error
    }
}

const initDivisionListSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        divisionList: payload.divisions
    }
}

const initDivisionListFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error
    }
}

const initLocationDropDownSucessReducer = (state = initialState, payload) => {
    let dropdowns = state.locationDropDown;
    dropdowns[payload.locationId] = payload.locations.map(location => {return {...location, id: location.locationId}});
    return {
        ...state,
        locationDropDown: dropdowns,
        locationDropDownRefresh: new Date(),
    }
}

export default createReducer(initialState, {
    [INIT_LOCATION_HEIRARCHY_DROPDOWN_SUCCESS]: initLocationHeirarchySuccessReducer,
    [INIT_LOCATION_HEIRARCHY_DROPDOWN_FAIL]: initLocationHeirarchyFailReducer,
    [INIT_DIVISON_LIST_DROPDOWN_SUCCESS]: initDivisionListSuccessReducer,
    [INIT_DIVISON_LIST_DROPDOWN_FAIL]: initDivisionListFailReducer,
    [INIT_LOCATION_DROPDOWN_SUCCESS]: initLocationDropDownSucessReducer,
});
