import { combineEpics } from 'redux-observable';
import {authFailEpic, hideLoaderEpic, loginStartEpic, showLoaderEpic} from './authEpic';
import {divisionListDropdownStartEpic, locationDropdownStartEpic, locationHeirarchyDropdownStartEpic} from './widgetEpic';
import {fetchFieldStructureStartEpic} from './fieldStructureEpic';
import {expandEffortReportStartEpic, fetchDailyEffortReportStartEpic, fetchDeviationReportStartEpic, fetchDoctorVisitReportStartEpic, fetchEffortReportStartEpic, hideEffortReportLoaderEpic, showEffortReportLoaderEpic} from './effortReportEpic';
import {loadMenusEpic} from './clientEpic';
import {
    allowanceForDateEpic, distanceFinderEpic, expenseLocationTypeSelectEpic, getAllTownsEpic,
    hideExpenseLoaderEpic, initNewExpenseEpic, initRouteEpic, loadSundriesEpic,
    saveExpenseEpic, saveLodgingEpic, saveMeetingAllowanceEpic, saveMiscLineEpic, saveMultiSundriesEpic, saveSundriesEpic, saveSundriesToDBEpic, searchExpenseEpic, showExpenseLoaderEpic, submitExpenseEpic
} from "./expenseEpic";
import {approveExpenseEpic, hideMisExpenseLoaderEpic, routesForEmployeeDateEpic, searchApprovalDetailEpic, searchMisApprovalEpic, showMisExpenseLoaderEpic} from "./misExpenseEpic";
import {fetchDMLReportStartEpic, hideCustomerReportLoaderEpic, showCustomerReportLoaderEpic} from "./customerReportEpic";
import { showConsolidatedReportLoaderEpic, hideConsolidatedReportLoaderEpic, fetchConsolidatedReportStartEpic } from './expenseReportEpic';
import {hideSFCLoaderEpic, sfcCreateDistanceEpic, sfcSearchEpic, sfcUpdateDistancehEpic, showSFCLoaderEpic} from "./custom/sfcEpic";
import {hideApprovalLoaderEpic, initApprovalStartEpic, showApprovalLoaderEpic} from "./approvalEpic";

export const rootEpic = combineEpics(
    loginStartEpic,
    authFailEpic,
    showLoaderEpic,
    hideLoaderEpic,
    locationHeirarchyDropdownStartEpic,
    divisionListDropdownStartEpic,
    fetchFieldStructureStartEpic,
    fetchEffortReportStartEpic,
    expandEffortReportStartEpic,
    loadMenusEpic,
    initNewExpenseEpic,
    showExpenseLoaderEpic,
    hideExpenseLoaderEpic,
    initRouteEpic,
    distanceFinderEpic,
    allowanceForDateEpic,
    expenseLocationTypeSelectEpic,
    saveExpenseEpic,
    saveMiscLineEpic,
    saveMeetingAllowanceEpic,
    submitExpenseEpic,
    searchExpenseEpic,
    saveSundriesEpic,
    loadSundriesEpic,
    saveSundriesToDBEpic,
    saveMultiSundriesEpic,
    searchMisApprovalEpic,
    showMisExpenseLoaderEpic,
    hideMisExpenseLoaderEpic,
    saveLodgingEpic,
    searchApprovalDetailEpic,
    approveExpenseEpic,
    routesForEmployeeDateEpic,
    getAllTownsEpic,
    showCustomerReportLoaderEpic,
    hideCustomerReportLoaderEpic,
    fetchDMLReportStartEpic,
    fetchDailyEffortReportStartEpic,
    locationDropdownStartEpic,
    showEffortReportLoaderEpic,
    hideEffortReportLoaderEpic,
    fetchDoctorVisitReportStartEpic,
    showConsolidatedReportLoaderEpic,
    hideConsolidatedReportLoaderEpic,
    fetchConsolidatedReportStartEpic,
    sfcSearchEpic,
    showSFCLoaderEpic,
    hideSFCLoaderEpic,
    sfcUpdateDistancehEpic,
    sfcCreateDistanceEpic,
    showApprovalLoaderEpic,
    hideApprovalLoaderEpic,
    initApprovalStartEpic,
    fetchDeviationReportStartEpic
);
