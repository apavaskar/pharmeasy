import { PROFILE_FETCHED_FAIL, PROFILE_FETCHED_SUCCESS } from "./profileActionConstants";

export const userProfileSuccessAction = payload => dispatch => {
    dispatch({
    type: PROFILE_FETCHED_SUCCESS,
    payload: payload,
    });
};

export const userProfileFailAction = payload => dispatch => {
    console.log(payload);
    dispatch({
    type: PROFILE_FETCHED_FAIL,
    payload: payload,
});
};
