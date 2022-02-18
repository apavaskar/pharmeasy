import {SFC_CREATE_DISTANCE_FAIL, SFC_CREATE_DISTANCE_START, SFC_CREATE_DISTANCE_SUCCESS, SFC_SEARCH_FAIL, SFC_SEARCH_START, SFC_SEARCH_SUCCESS, SFC_UPDATE_DISTANCE_FAIL, SFC_UPDATE_DISTANCE_START, SFC_UPDATE_DISTANCE_SUCCESS} from "./sfcActionConstants";

export const sfcStartAction = payload => dispatch =>
{
    dispatch({
        type: SFC_SEARCH_START,
        payload: payload,
    });
};

export const sfcSuccessAction = payload => dispatch => {
    dispatch({
    type: SFC_SEARCH_SUCCESS,
    payload: payload,
    });
};

export const sfcFailAction = payload => dispatch => {
    dispatch({
    type: SFC_SEARCH_FAIL,
    payload: payload,
});
};

export const sfcUpdateDistanceStartAction = payload => dispatch =>
{
    dispatch({
        type: SFC_UPDATE_DISTANCE_START,
        payload: payload,
    });
};

export const sfcUpdateDistanceSuccessAction = payload => dispatch => {
    dispatch({
        type: SFC_UPDATE_DISTANCE_SUCCESS,
        payload: payload,
    });
};

export const sfcUpdateDistanceFailAction = payload => dispatch => {
    dispatch({
        type: SFC_UPDATE_DISTANCE_FAIL,
        payload: payload,
    });
};


export const sfcCreateDistanceStartAction = payload => dispatch =>
{
    dispatch({
        type: SFC_CREATE_DISTANCE_START,
        payload: payload,
    });
};

export const sfcCreateDistanceSuccessAction = payload => dispatch => {
    dispatch({
        type: SFC_CREATE_DISTANCE_SUCCESS,
        payload: payload,
    });
};

export const sfcCreateDistanceFailAction = payload => dispatch => {
    dispatch({
        type: SFC_CREATE_DISTANCE_FAIL,
        payload: payload,
    });
};
