import {createSelector} from 'reselect';

const call = state => state.call;
const reportingDate = state => state.call.reportingDate;

const allJoinees = state => state.call.allJoinees;
const joinees = state => state.call.joinees;
const isPhysical = state => state.call.isPhysical;
const physicalReportingStep = state => state.call.physicalReportingStep;
const doctorToReport = state => state.call.doctorProfile;
const visitId = state => state.call.visitId;
const refreshDoctorList = state => state.call.refreshDoctorList;
const saveVisit = state => state.call.saveVisit;
const nonCallActivityListToReport = state => state.call.nonCallActivityList;
const activityIndex = state => state.call.activityIndex;
const initedVisitPage = state => state.call.initedVisitPage;
const visit = state => state.call.visit;
const locationTagError = state => state.call.locationTagError;
const saveCurrentCoordinates = state => state.call.saveCurrentCoordinates;
const stages = state => state.call.stages;

export const callSelector = createSelector(
  call,
  callSelection => callSelection,
);

export const visitDetailsSelector = createSelector(
  visit,
  visitSelection => visitSelection,
);

export const callReportingDateSelector = createSelector(
  reportingDate,
  reportingDateSelection => reportingDateSelection,
);

export const allJoineesSelector = createSelector(
  allJoinees,
  allJoineesSelection => allJoineesSelection,
);

export const joineesSelector = createSelector(
  joinees,
  joineesSelection => joineesSelection,
);

export const isPhysicalSelector = createSelector(
  isPhysical,
  isPhysicalSelection => isPhysicalSelection,
);

export const physicalReportingStepSelector = createSelector(
  physicalReportingStep,
  physicalReportingStepSelection => physicalReportingStepSelection,
);

export const doctorToReportSelector = createSelector(
  doctorToReport,
  doctorToReportSelection => doctorToReportSelection,
);

export const visitIdSelector = createSelector(
  visitId,
  visitIdSelection => visitIdSelection,
);

export const refreshDoctorListSelector = createSelector(
  refreshDoctorList,
  refreshDoctorListSelection => refreshDoctorListSelection,
);

export const saveVisitSelector = createSelector(
  saveVisit,
  saveVisitSelection => saveVisitSelection,
);

export const activityIndexSelector = createSelector(
  activityIndex,
  activityIndexSelection => activityIndexSelection,
);

export const nonCallActivityListToReportSelector = createSelector(
  nonCallActivityListToReport,
  nonCallActivityListToReportSelection => nonCallActivityListToReportSelection,
);

export const initedVisitPageSelector = createSelector(
  initedVisitPage,
  initedVisitPageSelection => initedVisitPageSelection,
);

export const locationTagErrorSelector = createSelector(
  locationTagError,
  locationTagSelection => locationTagSelection,
);

export const saveCurrentCoordinatesSelector = createSelector(
  saveCurrentCoordinates,
  saveCurrentCoordinatesSelection => saveCurrentCoordinatesSelection,
);

export const stagesSelector = createSelector(
  stages,
  stagesSelection => stagesSelection,
);
