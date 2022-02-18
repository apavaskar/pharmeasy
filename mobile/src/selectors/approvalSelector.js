import {createSelector} from 'reselect';

const approvals = state => state.approvals;
const patientApprovals = state => state.approvals.patientApprovals;

export const patientApprovalsSelector = createSelector(
  patientApprovals,
  patientApprovalsSelection => patientApprovalsSelection,
);
