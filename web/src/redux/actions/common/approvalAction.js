import {INIT_APPROVAL_FAIL, INIT_APPROVAL_START, INIT_APPROVAL_SUCCESS} from './approvalActionConstants';

export const initApprovalStartAction = payload => dispatch =>
{
    dispatch({
        type: INIT_APPROVAL_START,
        payload: payload,
    });
};

export const initApprovalSuccessAction = payload => dispatch => {
    dispatch({
    type: INIT_APPROVAL_SUCCESS,
    payload: payload,
    });
};

export const initApprovalFailAction = payload => dispatch => {
    dispatch({
    type: INIT_APPROVAL_FAIL,
    payload: payload,
});
};

