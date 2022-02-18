import {FETCH_FIELD_STRUCTURE_FAIL, FETCH_FIELD_STRUCTURE_START, FETCH_FIELD_STRUCTURE_SUCCESS} from "./fieldStructureActionConstants";

export const fetchFieldStructureReportStartAction = payload => dispatch =>
{
    dispatch({
        type: FETCH_FIELD_STRUCTURE_START,
        payload: payload,
    });
}
;

export const fetchFieldStructureReportSuccessAction = payload => dispatch => {
    dispatch({
    type: FETCH_FIELD_STRUCTURE_SUCCESS,
    payload: payload,
});
};

export const fetchFieldStructureReportFailAction = payload => dispatch => {
    dispatch({
    type: FETCH_FIELD_STRUCTURE_FAIL,
    payload: payload,
});
};
