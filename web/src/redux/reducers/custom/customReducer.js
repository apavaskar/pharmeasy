
import {SFC_CREATE_DISTANCE_FAIL, SFC_CREATE_DISTANCE_SUCCESS, SFC_SEARCH_FAIL, SFC_SEARCH_SUCCESS, SFC_UPDATE_DISTANCE_FAIL, SFC_UPDATE_DISTANCE_SUCCESS} from "../../actions/custom/sfcActionConstants";
import {createReducer} from "../reducerUtils";

const initialState = {
  sfcs:[],
  distanceUpdated: false,
  towns: [],
  refresh: new Date(),
  error: {}
};


const sfcSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        sfcs: payload.sfcs,
        towns: payload.townList
    }
}

const sfcFailReducer = (state, payload) => {
    return {
        ...state,
        error: payload.error,
    };
}

const sfcUpdateDistanceSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        distanceUpdated: true
    }
}

const sfcUpdateDistanceFailReducer = (state, payload) => {
    return {
        ...state,
        error: payload.error,
    };
}

const sfcCreateDistanceSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        distanceUpdated: true,
        refresh: new Date()
    }
}

const sfcCreateDistanceFailReducer = (state, payload) => {
    return {
        ...state,
        error: payload.error,
    };
}


export default createReducer(initialState, {
    [SFC_SEARCH_SUCCESS]: sfcSuccessReducer,
    [SFC_SEARCH_FAIL]: sfcFailReducer,
    [SFC_UPDATE_DISTANCE_SUCCESS]: sfcUpdateDistanceSuccessReducer,
    [SFC_UPDATE_DISTANCE_FAIL]: sfcUpdateDistanceFailReducer,
    [SFC_CREATE_DISTANCE_SUCCESS]: sfcCreateDistanceSuccessReducer,
    [SFC_CREATE_DISTANCE_FAIL]: sfcCreateDistanceFailReducer,


});
