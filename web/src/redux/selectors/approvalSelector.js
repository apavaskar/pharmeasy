import { createSelector } from 'reselect';

const approvals = state => state.approvals.approvals

export const selectApprovals = createSelector(approvals, (approvalsSelect) => approvalsSelect);

