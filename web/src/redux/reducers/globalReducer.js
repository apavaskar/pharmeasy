import {createReducer} from "./reducerUtils";
import {SHOW_MESSAGE} from "../actions/global/globalActionConstants";
import {HIDE_SPINNER, SHOW_SPINNER} from "../actions/widgets/widgetActionConstants";

const initialState = {
    showLoader: false,
    showMessage: false,
    message: '',
    messageType: '',
    error: {}
};

const showMessageReducer = (state = initialState, payload) => {
    if (payload.error !== undefined) {
        return {
            ...state,
            showMessage: true,
            messageType: 'error',
            error: payload.error
        };
    } else {
        return {
            ...state,
            showMessage: true,
            message: payload.message.text,
            messageType: payload.message.type
        }
    }
};

const showSpinnerReducer = (state = initialState, payload) => {
    return {
        ...state,
        showLoader: true
    };
}

const hideSpinnerReducer =(state = initialState, payload) => {
    return {
        ...state,
        showLoader: false
    };
}

export default createReducer(initialState, {
    [SHOW_MESSAGE]: showMessageReducer,
    [SHOW_SPINNER]: showSpinnerReducer,
    [HIDE_SPINNER]: hideSpinnerReducer,
});
