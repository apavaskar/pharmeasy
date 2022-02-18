import {INIT_TOWN_LIST_FAIL, INIT_TOWN_LIST_START, INIT_TOWN_LIST_SUCCESS} from "./routeSelectionConstants";

export const initTownsForRouteStartAction = payload => dispatch =>
{
    dispatch({
        type: INIT_TOWN_LIST_START,
        payload: payload,
    });
}
;

export const initTownsForRouteSuccessAction = payload => dispatch => {
    dispatch({
    type: INIT_TOWN_LIST_SUCCESS,
    payload: payload,
});
};

export const initTownsForRouteFailAction = payload => dispatch => {
    dispatch({
    type: INIT_TOWN_LIST_FAIL,
    payload: payload,
});
};
