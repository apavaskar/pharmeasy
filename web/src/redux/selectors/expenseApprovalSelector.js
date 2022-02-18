import { createSelector } from 'reselect';

const misApprovals = state => state.misApproval;
const approvals = state => state.misApproval.approvals;
const approvalDetail = state => state.misApproval.approval;
const detailsFetched = state => state.misApproval.detailsFetched;
const routes = state => state.misApproval.routes;
const status = state => state.misApproval.status;
const consolidatedReport = state => state.misApproval.consolidatedReport
const consolidatedReportRefresh = state => state.misApproval.refresh


export const selectMisApprovals = createSelector(
    misApprovals,
    misApprovalsSelection => misApprovalsSelection  );

export const selectExpenseApprovals = createSelector(
    approvals,
        approvalsSelection => approvalsSelection
)

export const selectApprovalDetail = createSelector(
    approvalDetail,
    approvalDetailSelection => approvalDetailSelection
)

export const selectDetailsFetched = createSelector(
    detailsFetched,
    detailsFetchedSelection => detailsFetchedSelection
)

export const selectRoutes = createSelector(
    routes,
        routesSelection => routesSelection
)

export const selectExpenseApprovalStatus = createSelector(
    status,
        statusSelection => statusSelection
)

export const selectConsolidatedReport = createSelector(
    consolidatedReport, 
    dataSelection => dataSelection
);

export const selectConsolidatedReportRefresh = createSelector(
    consolidatedReportRefresh,
    selectConsolidatedReportRefresh => selectConsolidatedReportRefresh
)