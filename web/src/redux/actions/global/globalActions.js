import {SHOW_MESSAGE} from "./globalActionConstants";

export const showMessageAction = payload => dispatch =>
{
    dispatch({
        type:SHOW_MESSAGE,
        payload: payload,
    });
};
