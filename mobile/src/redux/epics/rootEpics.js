import {combineEpics} from 'redux-observable';
import {dbInstallEpic} from './dbInstallEpic';
import {
  authHideSpinnerEpic,
  authShowSpinnerEpic,
  authStartEpic,
  logoutEpic,
} from './authEpic';
import {masterSyncStartEpic, masterSyncSuccessEpic} from './masterSyncEpic';
import {
  loadBeatsEpic,
  loadDoctorsEpic,
  loadEmployeeProfileEpic,
} from './commonEpic';
import {
  addBeatsToPlanEpic,
  addDoctorToPlanEpic,
  changePlanActionTypeEpic,
  fetchSummaryEpic,
  initManagerDoctorsEpic,
  initNoncallEpic,
  initPlanEpic,
  planHideSpinnerEpic,
  planShowSpinnerEpic,
  removeDoctorFromPlanEpic,
  resetPlanEpic,
  saveDoctorsToPlanEpic,
  saveManagerDoctorsEpic,
  saveNonCallEpic,
} from './planEpic';
import {
  changeCallTypeListEpic,
  deleteRCPAEntryEpic,
  handlePhysicalDigitalSwitchEpic,
  initMarketingEpic,
  rcpaEntryChangeEpic,
  reportNonCallEpic,
} from './callReportEpic';
import {
  loadDigitalTemplatesEpic,
  videoCallSaveEpic,
} from './digitalCallReportingEpic';
import {applyLeaveEpic, initLeaveEpic} from './leaveEpic';
import {
  initCRMDashboardEpic,
  initDashboardEpic,
  notificationsDashboardEpic,
} from './dashboard/dashboardEpic';
import {
  coverageReportEpic,
  missedCallReportEpic,
} from './dashboard/effortReportEpic';

import {initSettingsViewEpic} from './settingsEpic';
import {transactionSyncEpic} from './syncEpic';
import {
  deleteHospitalEntryEpic,
  initHospitalDailyEntryEpic,
  initHospitalListEpic,
  loadEntriesEpic,
  saveHospitalDailyEntryEpic,
  saveHospitalEntryEpic,
} from './hospitalEpic';
import {
  patientRCPAApprovalEpic,
  refreshApprovalPatientEpic,
} from './approvalEpic';
import {loadMyTeamPlanEpic} from './managerPlanEpic';
import {
  addUnplannedDoctorEpic,
  addUnplannedNCAEpic,
  callReportingListChangeTypeEpic,
  doctorsToReportListEpic,
  ncaToReportListEpic,
  zsmConfirmCallEpic,
} from './callReporting/callReportingListEpic';
import {
  initVisitCommentsEpic,
  initVisitEpic,
  saveDoctorCoordinates,
  saveVisitEpic,
} from './callReporting/callReportingEpic';
import {initRCPAEpic, singleRCPAChangeEpic} from './rcpa/rcpaEpic';
import {initBrandDetailingEpic} from './brandDetailing/brandDetailingEpic';
import {
  distributeInputEpic,
  initDistributedInputsEpic,
  initInputInventoryListEpic,
} from './inputDetailing/inputDetailingEpic';
import {
  digitalCallSaveEpic,
  initDigitalCallEpic,
} from './digitalCall/digitalCallEpic';
import {
  addDoctorHideSpinnerEpic,
  addDoctorShowSpinnerEpic,
  doctorListForMappingEpic,
  initDoctorAddEpic,
  saveDoctorEpic,
} from './doctorChemist/doctorChemistEpic';
import {
  troubleShootHideSpinnerEpic,
  troubleShootShowSpinnerEpic,
  troubleShootStartEpic,
} from './settings/troubleShootEpic';
import {
  closeDetailingEpic,
  downloadVAsEpic,
  initBrandListForEdetailingEpic,
  initPrecallEpic,
  loadThumbnailEpic,
  loadVAToDetailEpic,
  savePrecallPlanEpic,
  vaHideSpinnerEpic,
  vaShowSpinnerEpic,
} from './edetailing/edetailingEpic';
import {loadConfigsEpic} from './configs/configsEpic';
import {loadCallDashboardEpic} from './dashboardEpic';

export const rootEpic = combineEpics(
  dbInstallEpic,
  authStartEpic,
  logoutEpic,
  authShowSpinnerEpic,
  authHideSpinnerEpic,
  masterSyncStartEpic,
  masterSyncSuccessEpic,
  loadEmployeeProfileEpic,
  initPlanEpic,
  loadBeatsEpic,
  addBeatsToPlanEpic,
  removeDoctorFromPlanEpic,
  loadDoctorsEpic,
  addDoctorToPlanEpic,
  saveDoctorsToPlanEpic,
  videoCallSaveEpic,
  handlePhysicalDigitalSwitchEpic,
  loadDigitalTemplatesEpic,
  rcpaEntryChangeEpic,
  fetchSummaryEpic,
  changePlanActionTypeEpic,
  initLeaveEpic,
  applyLeaveEpic,
  initNoncallEpic,
  saveNonCallEpic,
  changeCallTypeListEpic,
  reportNonCallEpic,
  initSettingsViewEpic,
  transactionSyncEpic,
  initInputInventoryListEpic,
  distributeInputEpic,
  deleteRCPAEntryEpic,
  initHospitalListEpic,
  saveHospitalEntryEpic,
  loadEntriesEpic,
  deleteHospitalEntryEpic,
  initHospitalDailyEntryEpic,
  saveHospitalDailyEntryEpic,
  refreshApprovalPatientEpic,
  patientRCPAApprovalEpic,
  loadMyTeamPlanEpic,
  initMarketingEpic,
  planShowSpinnerEpic,
  planHideSpinnerEpic,
  saveManagerDoctorsEpic,
  initManagerDoctorsEpic,
  resetPlanEpic,
  callReportingListChangeTypeEpic,
  doctorsToReportListEpic,
  addUnplannedDoctorEpic,
  ncaToReportListEpic,
  addUnplannedNCAEpic,
  initVisitEpic,
  initRCPAEpic,
  singleRCPAChangeEpic,
  initBrandDetailingEpic,
  saveVisitEpic,
  initDistributedInputsEpic,
  initDigitalCallEpic,
  digitalCallSaveEpic,
  zsmConfirmCallEpic,
  doctorListForMappingEpic,
  troubleShootStartEpic,
  troubleShootHideSpinnerEpic,
  troubleShootShowSpinnerEpic,
  initBrandListForEdetailingEpic,
  downloadVAsEpic,
  loadThumbnailEpic,
  savePrecallPlanEpic,
  loadVAToDetailEpic,
  saveDoctorCoordinates,
  initPrecallEpic,
  initVisitCommentsEpic,
  initDashboardEpic,
  notificationsDashboardEpic,
  coverageReportEpic,
  missedCallReportEpic,
  loadConfigsEpic,
  initCRMDashboardEpic,
  vaShowSpinnerEpic,
  vaHideSpinnerEpic,
  closeDetailingEpic,
  loadCallDashboardEpic,
  initDoctorAddEpic,
  saveDoctorEpic,
  addDoctorShowSpinnerEpic,
  addDoctorHideSpinnerEpic,
);
