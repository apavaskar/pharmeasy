import {executeQuery, selectAdhocQuery, selectQuery} from '../genericDao';
import {PRE_CALL_RCPA} from '../../configs/AppConstants';
import {
  BRAND_DETAILING,
  DIGITAL_CALL_DATA,
  EMPLOYEE_PROFILE,
  generateId,
  HOSPITAL_DAILY_ENTRY,
  HOSPITAL_ENTRY,
  INPUT_DISTRIBUTION,
  RCPA_DATA,
  TOUR_PLAN,
  VISIT_JOINEES,
} from '../constants';
import {insertIntoSyncLog} from '../SyncLogDbService';
import {catchError} from 'rxjs/operators';

export const pickTransactionsToSync = async () => {
  try {
    const visits = await selectAdhocQuery(
      'SELECT id externalCode, visited isReported, remarks, synced,' +
        '  visitTypeId, isJoint, isRCPADone isRcpaDone, attendeeId, isActive, activityType, activityTypeId, ' +
        '  joineeReferenceId, planDateYyyyMmDd yyyyMmDd, planLocationId locationId, planEmployeeId employeeId, ' +
        '  customerId, planned isPlanned, ncaDuration duration, visitTime, coordinateId as coordinates from TourPlan where synced = ?',
      [0],
    );
    let visitsToSync = [];
    for (let visit of visits) {
      console.log(visit.visitTime);
      console.log(new Date(parseInt(visit.visitTime)));
      visit = {
        ...visit,
        isPlanned: visit.isPlanned === 1,
        isRcpaDone: visit.isRcpaDone === 1,
        isReported: visit.isReported === 1,
        visitRecordTime: new Date(parseInt(visit.visitTime)),
        detailingList:
          (await pickDetailingListForVisit(
            visit.externalCode,
            visit.attendeeId,
          )) || [],
        inputsList:
          (await pickInputsForVisit(visit.externalCode, visit.attendeeId)) ||
          [],
        joineeList:
          (await pickJoineeListForVisit(
            visit.externalCode,
            visit.attendeeId,
          )) || [],
        rcpaList:
          (await pickRcpaForVisit(visit.externalCode, visit.attendeeId)) || [],
        digitalVisitData:
          (await pickDigitalCalls(visit.externalCode, visit.attendeeId)) || [],
      };
      visitsToSync.push(visit);
    }
    return {
      visits: visitsToSync,
      hospitalRcpaList: await getUnsyncedHospitalEntries(),
      hospitalDailyRcpaList: await getUnsyncedDailyHospitalVisits(),
      crmDoctorStages: (await pickCRMStageData()) || [],
      crmDoctorStatus: (await pickCRMStatusData()) || [],
    };
  } catch (e) {
    console.log(e);
  }
};

const pickDetailingListForVisit = async (visitId, attendeeId) => {
  let detailings = await selectAdhocQuery(
    'SELECT id externalCode, detailingId, brandId, detlSeq sequence, action actionTaken from BrandDetailing where visitId = ?',
    [visitId],
  );
  return detailings.map(d => {
    return {...d, attendeeId: attendeeId};
  });
};

const pickInputsForVisit = async (visitId, attendeeId) => {
  let inputs = await selectAdhocQuery(
    'SELECT id externalCode, action actionTaken, inputId, quantity from InputDistribution where visitId =? ',
    [visitId],
  );
  return inputs.map(i => {
    return {...i, attendeeId: attendeeId};
  });
};

const pickJoineeListForVisit = async (visitId, attendeeId) => {
  let joinees = await selectAdhocQuery(
    'SELECT id externalCode, actionTaken, joineeId, managerId from visitJoinees where visitId = ?',
    [visitId],
  );
  return joinees.map(j => {
    return {...j, attendeeId: attendeeId};
  });
};

const pickRcpaForVisit = async (visitId, attendeeId) => {
  let rcpas = await selectAdhocQuery(
    'SELECT id externalCode, action actionTaken, chemistId, compBrandQty competitionQuantity, compBrandRxns competitionRxn,' +
      'compBrandValue competitionValue, doctorId, brandId itemId, brandQty quantity, rcpaId, rxns rxn, rxnValue value from RCPAData where visitId = ?',
    [visitId],
  );
  return rcpas.map(r => {
    return {...r, attendeeId: attendeeId, typeId: PRE_CALL_RCPA};
  });
};

const pickCRMStageData = async () => {
  let rawDatas = await selectAdhocQuery(
    'SELECT customerId, PRODUCT_ID, STAGE_ID, IS_DROP, IS_ENGAGEMENT, ACTIVITY_ID from ' +
      '  CrmStage inner join TourPlan on TourPlan.id = CrmStage.activity_id where synced = 0',
    [],
  );
  return rawDatas.map(r => {
    console.log(r);
    return {
      doctor: {
        id: r.customerId,
      },
      stage: {
        id: r.STAGE_ID === null ? '' : r.STAGE_ID,
      },
      product: {
        id: r.PRODUCT_ID,
      },
      dropped: r.IS_DROP,
      engagement: r.IS_ENGAGEMENT,
    };
  });
};

const pickCRMStatusData = async () => {
  let rawDatas = await selectAdhocQuery(
    'SELECT doctorId, productId, stageId, dropped from CrmLatestStage',
    [],
  );
  return rawDatas.map(r => {
    return {
      doctor: {
        id: r.doctorId,
      },
      stage: {
        id: r.stageId === null ? '' : r.stageId,
      },
      product: {
        id: r.productId,
      },
      dropped: r.dropped,
    };
  });
};

const getUnsyncedHospitalEntries = async () => {
  const employee = await selectQuery(EMPLOYEE_PROFILE);
  const data = (await selectQuery(HOSPITAL_ENTRY, [0], 'WHERE synced = ?')).map(
    e => {
      return {
        actionTaken: e.action,
        employeeId: employee[0].id,
        emrokPatients: e.patients,
        entityId: e.entityId,
        externalCode: e.id,
        hospitalId: e.hospitalId,
        icuPatients: e.patientsICU,
        locationId: employee[0].locationId,
        rcpaDate: e.visitDate,
        telcoplaninPatients: e.patientOnInj,
      };
    },
  );
  console.log(data);
  return data;
};

export const getUnsyncedDailyHospitalVisits = async () => {
  const employee = (await selectQuery(EMPLOYEE_PROFILE, []))[0];
  return (await selectQuery(HOSPITAL_DAILY_ENTRY, [0], 'where synced = ?')).map(
    row => {
      return {
        actionTaken: row.action,
        bothPatients: row.both,
        employeeId: employee.id,
        emrokIvPatients: row.iv,
        emrokOPatients: row.oral,
        entityId: row.entryId,
        externalCode: row.id,
        hospitalId: row.hospitalId,
        locationId: employee.locationId,
        rcpaDate: row.visitDate,
        doctorId: row.doctorId,
        doctorName: row.doctorName,
      };
    },
  );
};

const pickDigitalCalls = async (visitId, attendeeId) => {
  const calls = await selectQuery(
    DIGITAL_CALL_DATA,
    [visitId],
    'where visitId = ?',
  );
  return calls.map(c => {
    return {
      actionTaken: c.action,
      attendeeId: attendeeId,
      digitalVisitId: null,
      duration: c.duration,
      externalCode: c.id,
      isActive: true,
      startTime: new Date().getTime(),
      templateId: c.templateId,
      visitModeId: c.visitModeId,
    };
  });
};

const updates = {
  hrcpa: `UPDATE ${HOSPITAL_ENTRY} set entryId=?, synced=1, action='N' where id=?`,
  hdrcp: `UPDATE ${HOSPITAL_DAILY_ENTRY} set entryId=?, synced=1, action='N' where id=?`,
  dtvat: `UPDATE ${TOUR_PLAN} set attendeeId =? , synced = 1, status = 'N' where id=?`,
  vrcpa: `UPDATE ${RCPA_DATA} set rcpaId = ? where id =?`,
  vdetl: `UPDATE ${BRAND_DETAILING} set detailingId = ? where id = ?`,
  dtvje: `UPDATE ${VISIT_JOINEES} set joineeId = ?, actionTaken = 'N' where id = ?`,
  vinpt: `UPDATE ${INPUT_DISTRIBUTION} set serverId =?, action = 'N' where id =?`,
  digvs: `UPDATE ${DIGITAL_CALL_DATA} set digitalVisitId = ? action ='N' where id = ?`,
};
export const updateSyncedData = async data => {
  for (const key in data) {
    const value = data[key];
    const prefix = value.substring(0, 5);
    await executeQuery(updates[prefix], [value, key]);
  }
  await executeQuery(
    'UPDATE CRMLatestStage set synced = true where synced = ?',
    [false],
  );
  await insertIntoSyncLog(generateId(), 'TRANSACTION', 'ALL', data.length);
};
