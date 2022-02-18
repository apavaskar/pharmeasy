import {
    ADD_MISC_LINE,
    ADD_SUNDRIES_LINE,
    CLOSE_ROUTE_EXPENSE_DIALOG, CLOSE_TRANSIT_EXPENSE_DIALOG,
    FIND_ALLOWANCES_FOR_DATE_FAIL,
    FIND_ALLOWANCES_FOR_DATE_START,
    FIND_ALLOWANCES_FOR_DATE_SUCCESS,
    FIND_DISTANCE_TOWNS_FAIL,
    FIND_DISTANCE_TOWNS_START,
    FIND_DISTANCE_TOWNS_SUCCESS, GET_ALL_TOWN_FAIL, GET_ALL_TOWN_START, GET_ALL_TOWN_SUCCESS,
    INIT_MISC_LINES,
    INIT_NEW_EXPENSE_FAIL,
    INIT_NEW_EXPENSE_START,
    INIT_NEW_EXPENSE_SUCCESS,
    LOAD_SUNDRIES_FAIL,
    LOAD_SUNDRIES_START,
    LOAD_SUNDRIES_SUCCESS, RESET_EXPENSE_DETAIL_FAIL, RESET_EXPENSE_DETAIL_START, RESET_EXPENSE_DETAIL_SUCCESS, SAVE_LODGING_FAIL, SAVE_LODGING_START, SAVE_LODGING_SUCCESS,
    SAVE_MEETING_ALLOWANCE_FAIL,
    SAVE_MEETING_ALLOWANCE_START,
    SAVE_MEETING_ALLOWANCE_SUCCESS,
    SAVE_MISC_LINE_FAIL,
    SAVE_MISC_LINE_START,
    SAVE_MISC_LINE_SUCCESS,
    SAVE_MULTI_SUNDRIES_FAIL,
    SAVE_MULTI_SUNDRIES_START, SAVE_MULTI_SUNDRIES_SUCCESS,
    SAVE_ROUTE_EXPENSE_FAIL,
    SAVE_ROUTE_EXPENSE_START,
    SAVE_ROUTE_EXPENSE_SUCCESS,
    SAVE_SUNDRIES_START,
    SAVE_SUNDRIES_SUCCESS,
    SEARCH_EXPENSE_FAIL,
    SEARCH_EXPENSE_START,
    SEARCH_EXPENSE_SUCCESS,
    SELECT_EXPENSE_LOCATION_TYPE_FAIL,
    SELECT_EXPENSE_LOCATION_TYPE_START,
    SELECT_EXPENSE_LOCATION_TYPE_SUCCESS,
    SUBMIT_EXPENSE_FAIL,
    SUBMIT_EXPENSE_START,
    SUBMIT_EXPENSE_SUCCESS
} from "./expenseActionConstants";

export const initNewExpenseStartAction = payload => dispatch =>
{
    dispatch({
        type: INIT_NEW_EXPENSE_START,
        payload: payload,
    });
};

export const initNewExpenseSuccessAction = payload => dispatch => {
    dispatch({
        type: INIT_NEW_EXPENSE_SUCCESS,
        payload: payload,
    });
};

export const initNewExpenseFailAction = payload => dispatch => {
    dispatch({
    type: INIT_NEW_EXPENSE_FAIL,
    payload: payload,
});
};

export const distanceBetweenTownsStartAction = payload => dispatch =>
{
    dispatch({
        type: FIND_DISTANCE_TOWNS_START,
        payload: payload,
    });
}
;

export const distanceBetweenTownsSuccessAction = payload => dispatch => {
    dispatch({
    type: FIND_DISTANCE_TOWNS_SUCCESS,
    payload: payload,
});
};

export const distanceBetweenTownsFailAction = payload => dispatch => {
    dispatch({
    type: FIND_DISTANCE_TOWNS_FAIL,
    payload: payload,
});
};

export const allowanceForDateStartAction = payload => dispatch =>
{
    dispatch({
        type: FIND_ALLOWANCES_FOR_DATE_START,
        payload: payload,
    });
}
;

export const allowanceForDateSuccessAction = payload => dispatch => {
    dispatch({
    type: FIND_ALLOWANCES_FOR_DATE_SUCCESS,
    payload: payload,
});
};

export const allowanceForDateFailAction = payload => dispatch => {
    dispatch({
    type: FIND_ALLOWANCES_FOR_DATE_FAIL,
    payload: payload,
});
};

export const saveRouteExpenseStartAction = payload => dispatch => {
    dispatch({
        type: SAVE_ROUTE_EXPENSE_START,
        payload: payload,
    });
};

export const saveRouteExpenseSuccessAction = payload => dispatch => {
    dispatch({
        type: SAVE_ROUTE_EXPENSE_SUCCESS,
        payload: payload,
    });
};

export const saveRouteExpenseFailAction = payload => dispatch => {
    dispatch({
        type: SAVE_ROUTE_EXPENSE_FAIL,
        payload: payload,
    });
};

export const expenseLocationTypeSelectStartAction = payload => dispatch =>
{
    dispatch({
        type: SELECT_EXPENSE_LOCATION_TYPE_START,
        payload: payload,
    });
}
;

export const expenseLocationTypeSelectSuccessAction = payload => dispatch => {
    dispatch({
    type: SELECT_EXPENSE_LOCATION_TYPE_SUCCESS,
    payload: payload,
});
};

export const expenseLocationTypeSelectFailAction = payload => dispatch => {
    dispatch({
        type: SELECT_EXPENSE_LOCATION_TYPE_FAIL,
        payload: payload,
    });
};

export const closeRouteExpenseDialogAction = payload => dispatch => {
    dispatch({
        type: CLOSE_ROUTE_EXPENSE_DIALOG,
        payload: payload,
    });
}

export const closeTransitExpenseDialogAction = payload => dispatch => {
    dispatch({
        type: CLOSE_TRANSIT_EXPENSE_DIALOG,
        payload: payload,
    });
}


export const saveMiscLineStartAction = payload => dispatch =>
{
    dispatch({
        type: SAVE_MISC_LINE_START,
        payload: payload,
    });
}
;

export const saveMiscLineSuccessAction = payload => dispatch => {
    dispatch({
    type: SAVE_MISC_LINE_SUCCESS,
    payload: payload,
});
};

export const saveMiscLineFailAction = payload => dispatch => {
    dispatch({
    type: SAVE_MISC_LINE_FAIL,
    payload: payload,
});
};

export const addMiscLineAction = payload => dispatch => {
    dispatch({
       type: ADD_MISC_LINE,
       payload: payload
    });
}

export const addSundriesLineAction = payload => dispatch => {
    dispatch({
        type: ADD_SUNDRIES_LINE,
        payload: payload
    });
}

export const initMiscLineAction = payload => dispatch => {
    dispatch({
        type: INIT_MISC_LINES,
        payload: payload
    });
}

export const meetingAllowanceSaveStartAction = payload => dispatch => {
    dispatch({
        type: SAVE_MEETING_ALLOWANCE_START,
        payload: payload,
    });
}

export const meetingAllowanceSaveSuccessAction = payload => dispatch => {
    dispatch({
        type: SAVE_MEETING_ALLOWANCE_SUCCESS,
        payload: payload,
    });
}

export const meetingAllowanceSaveFailAction = payload => dispatch => {
    dispatch({
        type: SAVE_MEETING_ALLOWANCE_FAIL,
        payload: payload,
    });
}

export const submitExpenseStartAction = payload => dispatch => {
    dispatch({
        type: SUBMIT_EXPENSE_START,
        payload: payload,
    });
};

export const submitExpenseSuccessAction = payload => dispatch => {
    dispatch({
        type: SUBMIT_EXPENSE_SUCCESS,
        payload: payload,
    });
};

export const submitExpenseFailAction = payload => dispatch => {
    dispatch({
        type: SUBMIT_EXPENSE_FAIL,
        payload: payload,
    });
};

export const searchExpenseStartAction = payload => dispatch => {
    dispatch({
        type: SEARCH_EXPENSE_START,
        payload: payload,
    });
};

export const searchExpenseSuccessAction = payload => dispatch => {
    dispatch({
        type: SEARCH_EXPENSE_SUCCESS,
        payload: payload,
    });
};

export const searchExpenseFailAction = payload => dispatch => {
    dispatch({
        type: SEARCH_EXPENSE_FAIL,
        payload: payload,
    });
};

export const saveSundriesStartAction = payload => dispatch =>
{
    dispatch({
        type: SAVE_SUNDRIES_START,
        payload: payload,
    });
}
;

export const saveSundriesSuccessAction = payload => dispatch => {
    dispatch({
        type: SAVE_SUNDRIES_SUCCESS,
        payload: payload,
    });
};

export const saveSundriesFailAction = payload => dispatch => {
    dispatch({
        type: SAVE_SUNDRIES_SUCCESS,
        payload: payload,
    });
};

export const loadSundriesStartAction = payload => dispatch => {
    dispatch({
        type: LOAD_SUNDRIES_START,
        payload: payload,
    });
}
;

export const loadSundriesSuccessAction = payload => dispatch => {
    dispatch({
    type: LOAD_SUNDRIES_SUCCESS,
    payload: payload,
});
};

export const loadSundriesFailAction = payload => dispatch => {
    dispatch({
        type: LOAD_SUNDRIES_FAIL,
        payload: payload,
    });
};

export const saveMultiSundriesStartAction = payload => dispatch =>
    {
        dispatch({
            type: SAVE_MULTI_SUNDRIES_START,
            payload: payload,
        });
    }
;

export const saveMultiSundriesSuccessAction = payload => dispatch => {
    dispatch({
        type: SAVE_MULTI_SUNDRIES_SUCCESS,
        payload: payload,
    });
};

export const saveMultiSundriesFailAction = payload => dispatch => {
    dispatch({
        type: SAVE_MULTI_SUNDRIES_FAIL,
        payload: payload,
    });
};

export const saveLodgingStartAction = payload => dispatch =>
    {
        dispatch({
            type: SAVE_LODGING_START,
            payload: payload,
        });
    }
;

export const saveLodgingSuccessAction = payload => dispatch => {
    dispatch({
        type: SAVE_LODGING_SUCCESS,
        payload: payload,
    });
};

export const saveLodgingFailAction = payload => dispatch => {
    dispatch({
        type: SAVE_LODGING_FAIL,
        payload: payload,
    });
};

export const loadTownStartAction = payload => dispatch =>
{
    dispatch({
        type: GET_ALL_TOWN_START,
        payload: payload,
    });
};

export const loadTownSuccessAction = payload => dispatch => {
    dispatch({
        type: GET_ALL_TOWN_SUCCESS,
        payload: payload,
    });
};

export const loadTownFailAction = payload => dispatch => {
    dispatch({
        type: GET_ALL_TOWN_FAIL,
        payload: payload,
    });
};

export const resetExpenseDetailStartAction = payload => dispatch =>
{
    dispatch({
        type: RESET_EXPENSE_DETAIL_START,
        payload: payload,
    });
};

export const resetExpenseDetailSuccessAction = payload => dispatch => {
    dispatch({
        type: RESET_EXPENSE_DETAIL_SUCCESS,
        payload: payload,
    });
};

export const resetExpenseDetailFailAction = payload => dispatch => {
    dispatch({
        type: RESET_EXPENSE_DETAIL_FAIL,
        payload: payload,
    });
};
