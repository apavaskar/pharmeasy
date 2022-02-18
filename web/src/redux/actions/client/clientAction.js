import {INIT_MENU_LOAD_FAIL, INIT_MENU_LOAD_START, INIT_MENU_LOAD_SUCCESS} from "./clientActionConstant";

export const initMenusStartAction = payload => dispatch =>
{
    dispatch({
        type: INIT_MENU_LOAD_START,
        payload: payload,
    });
}
;

export const initMenusSuccessAction = payload => dispatch => {
    console.log(payload);
    dispatch({
        type: INIT_MENU_LOAD_SUCCESS,
        payload: payload,
    });
};

export const initMenusFailAction = payload => dispatch => {
        dispatch({
        type: INIT_MENU_LOAD_FAIL,
        payload: payload,
    });
    };
