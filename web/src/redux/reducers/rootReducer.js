import { combineReducers } from 'redux';
import authReducer from './authReducer';
import widgetReducer from './widgetReducer';
import fieldStructureReducer from './fieldStructureReducer';
import effortReportReducer from './effortReportReducer';
import clientReducer from './clientReducer';
import globalReducer from './globalReducer';
import newExpenseReducer from "./newExpenseReducer";
import misExpenseReducer from "./misExpenseReducer";
import dmlStructureReducer from "./dmlStructureReducer";
import customReducer from './custom/customReducer';
import approvalReducer from "./approvalReducer";
const rootReducer = combineReducers({
    auth: authReducer,
    widget: widgetReducer,
    fieldStructure: fieldStructureReducer,
    effortsReport: effortReportReducer,
    client: clientReducer,
    global: globalReducer,
    newExpense: newExpenseReducer,
    misApproval: misExpenseReducer,
    dmlReport: dmlStructureReducer,
    custom: customReducer,
    approvals: approvalReducer
});

export default rootReducer;
