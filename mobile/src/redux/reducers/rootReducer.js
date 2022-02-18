import {combineReducers} from 'redux';
import globalReducer from './globalReducer';
import authReducer from './authReducer';
import commonReducer from './commonReducer';
import planReducer from './planReducer';
import callReportingReducer from './callReporting/callReportingReducer';
import leaveReducer from './leaveReducer';
import configReducer from './configReducer';
import settingsReducer from './settingsReducer';
import hospitalReducer from './hospitalReducer';
import approvalReducer from './approvalReducer';
import syncReducer from './syncReducer';
import marketingActivityReducer from './marketingActivityReducer';
import managerPlanReducer from './managerPlanReducer';
import callReportingListReducer from './callReporting/callReportingListReducer';
import rcpaReducer from './rcpa/rcpaReducer';
import brandDetailingReducer from './brandDetailing/brandDetailingReducer';
import inputDetailingReducer from './inputDetailing/inputDetailingReducer';
import digitalCallReducer from './digitalCall/digitalCallReducer';
import doctorChemistReducer from './doctorChemist/doctorChemistReducer';
import edetailingBrandListReducer from './edetailing/edetailingBrandListReducer';
import edetailingReducer from './edetailing/edetailingReducer';
import dashboardReducer from './dashboard/dashboardReducer';
import effortReportReducer from './dashboard/effortReportReducer';
const rootReducer = combineReducers({
  global: globalReducer,
  auth: authReducer,
  common: commonReducer,
  plan: planReducer,
  managerPlan: managerPlanReducer,
  call: callReportingReducer,
  callReportingList: callReportingListReducer,
  leave: leaveReducer,
  config: configReducer,
  settings: settingsReducer,
  dashboard: dashboardReducer,
  hospital: hospitalReducer,
  approvals: approvalReducer,
  sync: syncReducer,
  marketingActivity: marketingActivityReducer,
  rcpa: rcpaReducer,
  brandDetailing: brandDetailingReducer,
  inputDetailing: inputDetailingReducer,
  digitalCall: digitalCallReducer,
  doctorChemist: doctorChemistReducer,
  edetailingBrandList: edetailingBrandListReducer,
  edetailing: edetailingReducer,
  effortReport: effortReportReducer,
});

export default rootReducer;
