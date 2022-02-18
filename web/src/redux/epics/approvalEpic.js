import {hideSpinner, showSpinner} from "../actions/widgets/widgetActions";
import {INIT_APPROVAL_FAIL, INIT_APPROVAL_START, INIT_APPROVAL_SUCCESS} from "../actions/common/approvalActionConstants";
import {catchError, debounceTime, filter, map, of, retry, switchMap} from "rxjs";
import {ofType} from "redux-observable";
import {initApprovalFailAction, initApprovalSuccessAction} from "../actions/common/approvalAction";
import {searchApprovalRequest} from "../../api/commonApi";

export const showApprovalLoaderEpic = action$ =>
    action$.pipe(
        filter(
            action =>
                action.type === INIT_APPROVAL_START
        ),
        map(showSpinner),
    )

export const hideApprovalLoaderEpic = action$ =>
    action$.pipe(
        filter(
            action =>
                action.type === INIT_APPROVAL_SUCCESS ||
                action.type === INIT_APPROVAL_FAIL
        ),
        map(hideSpinner),
    );


export const initApprovalStartEpic = (action$) =>
    action$.pipe(
        ofType(INIT_APPROVAL_START),
        debounceTime(500),
        switchMap(action =>
          searchApprovalRequest(action.payload).pipe(
              retry(1),
                  map(approvals =>
              initApprovalSuccessAction({requests: approvals.response})),
                    catchError((error) => of(initApprovalFailAction({error: error}))),
              )),
              catchError((error) => of(initApprovalFailAction({error: error}))))
    ;

