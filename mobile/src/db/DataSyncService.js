import {executeQuery, selectQuery} from './genericDao';
import {
  BRAND_DETAILING,
  EMPLOYEE_PROFILE,
  HOSPITAL_ENTRY,
  RCPA_DATA,
  SYNC_LOG,
  TOUR_PLAN,
  VISIT_JOINEES,
} from './constants';
import {CALL_TYPE_FIELD} from '../configs/AppConstants';

export const getLastSyncLog = async type => {
  const syncLogs = await selectQuery(
    SYNC_LOG,
    [type],
    'WHERE TYPE = ? order by timeCreated desc limit 1',
  );
  if (syncLogs.length === 0) {
    return {};
  }
  return syncLogs[0];
};

export const getDataToSync = async employeeId => {
  let activities = [];
  const profile = (
    await selectQuery(EMPLOYEE_PROFILE, [employeeId], 'WHERE ID = ?')
  )[0];
  console.log(profile);
  const unSyncedVisits = await selectQuery(TOUR_PLAN, [0], 'WHERE synced = ?');
  const unSyncedHospitalEntries = await getUnsyncedHospitalEntries(
    employeeId,
    profile.locationId,
  );
  const unSyncedDetailing = await selectQuery(
    BRAND_DETAILING,
    ['A', 'U', 'D'],
    'WHERE action in (?, ?, ?)',
  );
  const unSyncedJoinees = await selectQuery(
    VISIT_JOINEES,
    ['A', 'U', 'D'],
    'WHERE actionTaken in (?, ?, ?)',
  );
  const unSyncedRCPA = await selectQuery(
    RCPA_DATA,
    ['A', 'U', 'D'],
    'WHERE action in (?, ?, ?)',
  );

  let detailingMapByVisit = {};
  let rcpaMapByVisit = {};
  let joineeMapByVisit = {};
  unSyncedDetailing.forEach(detailing => {
    const visitId = detailing.visitId;
    let detailings = [];
    if (detailingMapByVisit[visitId] !== undefined) {
      detailings = detailingMapByVisit[visitId];
    }
    detailings.push({
      actionTaken: detailing.action,
      attendeeId: null,
      brandId: detailing.brandId,
      detailingId: detailing.detailingId,
      externalCode: detailing.id,
      prescriptionLevel: null,
      sequence: detailing.detlSeq,
    });
    detailingMapByVisit[visitId] = detailings;
  });

  unSyncedRCPA.forEach(rcpa => {
    const visitId = rcpa.visitId;
    let rcpas = [];
    if (rcpaMapByVisit[visitId] !== undefined) {
      rcpas = rcpaMapByVisit[visitId];
    }
    rcpas.push({
      actionTaken: rcpa.action,
      attendeeId: null,
      brandId: rcpa.brandId,
      chemistId: rcpa.chemistId,
      competitionQuantity: 0,
      competitionRxn: rcpa.compBrandRxns,
      competitionValue: rcpa.compBrandValue,
      doctorId: rcpa.doctorId,
      externalCode: rcpa.id,
      quantity: rcpa.rxns,
      value: rcpa.value,
      rcpaId: null,
      typeId: null,
    });
    rcpaMapByVisit[visitId] = rcpas;
  });

  unSyncedJoinees.forEach(joinee => {
    return {
      actionTaken: joinee['actionTaken '],
      attendeeId: joinee.attendeeId,
      externalCode: joinee.id,
    };
  });

  for (const visit of unSyncedVisits) {
    const visitId = visit.id;
    let detailings = detailingMapByVisit[visitId] || [];
    let rcpas = rcpaMapByVisit[visitId] || [];
    let visit = {
      activityType: CALL_TYPE_FIELD,
      activityTypeId: null,
      attendeeId: visit.planId,
      customerId: visit.doctorId,
      visitTypeId: visit.visitTypeId,
      externalCode: visit.id,
      employeeId: employeeId,
      duration: 0,
      detailingList: detailings.map(detailing => {
        return {...detailing, attendeeId: visitId};
      }),
      rcpaList: rcpas.map(rcpa => {
        return {...rcpa, attendeeId: visitId};
      }),
    };
    activities.push(visit);
  }

  return {
    hospitalRcpaList: unSyncedHospitalEntries,
    marketingActivities: [],
    visits: activities,
  };
};

const getUnsyncedHospitalEntries = async (employeeId, locationId) => {
  return (await selectQuery(HOSPITAL_ENTRY, [0], 'WHERE synced = ?')).map(e => {
    return {
      actionTaken: e.action,
      employeeId: employeeId,
      emrokPatients: e.patients,
      entityId: e.entityId,
      externalCode: e.id,
      hospitalId: e.hospitalId,
      icuPatients: e.patientsICU,
      locationId: locationId,
      rcpaDate: e.visitDate,
      telcoplaninPatients: e.patientOnInj,
    };
  });
};
