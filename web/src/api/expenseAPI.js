import {createRequest} from "./httpUtils";
import {
    allowancesByJobRoleAPI, approveExpenseApprovalAPI, distanceBetweenTownAPI, documentCountByDate, expenseForEmployeeYearMonth, routesForEmployeeAndDateApi,
    saveExpenseAPI, searchExpenseAPI, submitExpenseAPI, visitedTownsByDateAPI
} from "./apiConstants";

export const expenseActivitiesForMonthYear= (payload) => {
    const url = `${expenseForEmployeeYearMonth.url}/${payload.employeeId}/${payload.yearMonth}`;
    const api = {...expenseForEmployeeYearMonth, url: url};
    return createRequest(api, payload.certificate, null);
}

export const expenseDocumentCountForMonthYear= (payload) => {
    const url = `${documentCountByDate.url}/${payload.employeeId}/${payload.yearMonth}`;
    const api = {...documentCountByDate, url: url};
    return createRequest(api, payload.certificate, null);
}

export const townsForDate= (payload) => {
    const url = `${visitedTownsByDateAPI.url}/${payload.employeeId}/${payload.visitDate}`;
    const api = {...visitedTownsByDateAPI, url: url};
    return createRequest(api, payload.certificate, null);
}

export const distanceByTownList = payload => {
    let townList = payload.townList;
    if (payload.isReturn === true) {
       townList = [...payload.townList, payload.townList[0]];
    }
    return createRequest(distanceBetweenTownAPI, payload.certificate, townList);
}

export const allowancesForJobRole = (payload) => {
    const url = `${allowancesByJobRoleAPI.url}/${payload.locationId}/${payload.jobRole}/${payload.yearMonth}`;
    const api = {...allowancesByJobRoleAPI, url: url};
    return createRequest(api, payload.certificate, null)
}

export const saveExpense = payload =>
    createRequest(saveExpenseAPI, payload.certificate, payload.data);

export const submitExpenseRequest = payload => {
    const url = `${submitExpenseAPI.url}/${payload.employeeId}/${payload.yearMonth}`;
    const api = {...submitExpenseAPI, url: url};
    return createRequest(api, payload.certificate, null)
}

export const searchExpenseRequest = payload => {
    return createRequest(searchExpenseAPI, payload.certificate, payload.conditions);
}

export const searchMisExpenseApprovalRequest = payload => {
    return createRequest(searchExpenseAPI, payload.certificate, payload.conditions);
}

export const approveExpenseRequest = payload => {
    return createRequest(approveExpenseApprovalAPI, payload.certificate, payload.data);
}

export const routesForEmployeeAndDateRequest = payload => {
    const url = `${routesForEmployeeAndDateApi.url}/${payload.employeeId}/${payload.visitDate}`;
    const api = {...routesForEmployeeAndDateApi, url: url};
    return createRequest(api, payload.certificate, null)
}
