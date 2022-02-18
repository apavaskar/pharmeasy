import {LOGIN_FAIL, LOGIN_START, LOGIN_SUCCESS} from "./authActionConstants";

export const authStartAction = payload => dispatch =>
{
    dispatch({
        type: LOGIN_START,
        payload: payload,
    });
};

export const authSuccessAction = payload => dispatch => {
    dispatch({
    type: LOGIN_SUCCESS,
    payload: payload,
    });
};

export const authFailAction = payload => dispatch => {
    dispatch({
    type: LOGIN_FAIL,
    payload: payload,
});
};
