import { createReducer } from './reducerUtils';
import {
    ADD_MISC_LINE, ADD_SUNDRIES_LINE,
    CLOSE_ROUTE_EXPENSE_DIALOG,
    FIND_ALLOWANCES_FOR_DATE_FAIL,
    FIND_ALLOWANCES_FOR_DATE_SUCCESS,
    FIND_DISTANCE_TOWNS_FAIL,
    FIND_DISTANCE_TOWNS_SUCCESS, INIT_MISC_LINES,
    INIT_NEW_EXPENSE_FAIL,
    INIT_NEW_EXPENSE_SUCCESS, LOAD_SUNDRIES_FAIL, LOAD_SUNDRIES_SUCCESS, SAVE_MEETING_ALLOWANCE_FAIL,
    SAVE_MEETING_ALLOWANCE_SUCCESS, SAVE_MISC_LINE_SUCCESS, SAVE_MULTI_SUNDRIES_FAIL, SAVE_MULTI_SUNDRIES_SUCCESS,
    SAVE_ROUTE_EXPENSE_FAIL, SAVE_ROUTE_EXPENSE_SUCCESS, SAVE_SUNDRIES_FAIL, SAVE_SUNDRIES_SUCCESS, SEARCH_EXPENSE_SUCCESS,
    SELECT_EXPENSE_LOCATION_TYPE_FAIL,
    SELECT_EXPENSE_LOCATION_TYPE_SUCCESS, SUBMIT_EXPENSE_FAIL, SUBMIT_EXPENSE_SUCCESS
} from "../actions/expense/expenseActionConstants";
import {INIT_TOWN_LIST_FAIL, INIT_TOWN_LIST_SUCCESS} from "../actions/expense/routeSelectionConstants";
import {dateForServer, displayDateFromYyyyMmDd, toDate} from "../../utils/dateUtil";
import {APPROVE_EXPENSE_FAIL, APPROVE_EXPENSE_SUCCESS, MIS_APPROVAL_DETAIL_FAIL, MIS_APPROVAL_DETAIL_SUCCESS, MIS_SEARCH_APPROVAL_FAIL, MIS_SEARCH_APPROVAL_SUCCESS, RESET_EXPENSE_APPROVAL, ROUTE_EMPLOYEE_DATE_FAIL, ROUTE_EMPLOYEE_DATE_SUCCESS} from "../actions/expense/misExpenseActionConstants";
import {misApprovalSearchFailAction} from "../actions/expense/misExpenseActions";
import { CONSOLIDATED_REPORT_FAIL, CONSOLIDATED_REPORT_SUCCESS } from '../actions/reports/expense/expenseReportActionConstants';

const initialState = {
  approvals: [],
  approval: {},
  detailsFetched: false,
  routes: [],
  dates: [],
  status: '',
  error: {},
  consolidatedReport: []
};

const misApprovalSearchSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        approvals: payload.data
    }
}

const misApprovalSearchFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error
    }
}

const misApprovalDetailSuccessReducer = (state = initialState, payload) => {
    let mapOfTypes = {};
    payload.locationTypes.forEach(l =>
        mapOfTypes[l.id] = l.name
    )
    const documentCounts = {};
    payload.documentCounts.forEach(d => {
        let docs = [];
        if (documentCounts[d.expdt_yyyy_mm_dd] !== undefined) {
            docs = documentCounts[d.expdt_yyyy_mm_dd];
        }
        docs.push(d);
        documentCounts[d.expdt_yyyy_mm_dd] = docs;
    });
    const mappedActivities = payload.data.details.map(a => {
        return {...a,
            displayDate: displayDateFromYyyyMmDd(a.visitDate),
            locationTypeId: a.locationTypeId || '',
            locationTypeName: mapOfTypes[a.locationTypeId] !== undefined ? mapOfTypes[a.locationTypeId] : '',
            route: 'Select Route',
            meeting: a.totalMeetingAllowance,
            documentsCounts: documentCounts[a.visitDate] === undefined ? 0 : documentCounts[a.visitDate].length,
            documents: documentCounts[a.visitDate] === undefined ? [] : documentCounts[a.visitDate],
            totalExpense: a.totalExpense || 0}
    });
    return {
        ...state,
        approval: {details: mappedActivities, summaries: payload.data.summaries, employee: payload.data.employeeDetails,
            profile: payload.profile},
        detailsFetched: true
    }
}

const misApprovalDetailFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error
    }
}

const routeEmployeeDateSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        routes: payload.data
    }
}

const routeEmployeeDateFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error
    }
}

const approveExpenseSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        status: 'APPROVED'
    }
}


const approveExpenseFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error
    }
}

const approvalResetReducer = (state =initialState, payload) => {
    return {...state,
        approval: {},
        detailsFetched: false,
        routes: [],
        dates: [],
        status: '',
        error: {}};
}

const consolidatedReporSuccesstReducer = (state = initialState, payload) => {
    return {
      ...state,
        division: payload.division,
        consolidatedReport: payload.consolidatedReport,
        structure: payload.structure
    };
  };
  
  const consolidatedReportFailReducer = (state = initialState, payload) => {
    console.log(payload);
    return {
      ...state,
      consolidatedReport: [],
      error: payload.error,
    };
  };

export default createReducer(initialState, {
    [MIS_SEARCH_APPROVAL_SUCCESS]: misApprovalSearchSuccessReducer,
    [MIS_SEARCH_APPROVAL_FAIL]: misApprovalSearchFailReducer,
    [MIS_APPROVAL_DETAIL_SUCCESS]: misApprovalDetailSuccessReducer,
    [MIS_APPROVAL_DETAIL_FAIL]: misApprovalDetailFailReducer,
    [ROUTE_EMPLOYEE_DATE_SUCCESS]: routeEmployeeDateSuccessReducer,
    [ROUTE_EMPLOYEE_DATE_FAIL]: routeEmployeeDateFailReducer,
    [APPROVE_EXPENSE_SUCCESS]: approveExpenseSuccessReducer,
    [APPROVE_EXPENSE_FAIL]: approveExpenseFailReducer,
    [RESET_EXPENSE_APPROVAL]: approvalResetReducer,
    [CONSOLIDATED_REPORT_SUCCESS]: consolidatedReporSuccesstReducer,
    [CONSOLIDATED_REPORT_FAIL]: consolidatedReportFailReducer
});
