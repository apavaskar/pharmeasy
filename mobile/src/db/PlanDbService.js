import {toDbDate, toYyyyMm, toYyyyMmDd} from '../utils/dateUtil';
import {
  DOCTOR_MASTER,
  generateId,
  NAME_VALUE,
  NON_CALL_ACTIVITY,
  RCPA_DATA,
  TEAM_TOUR_PLAN,
  TOUR_PLAN,
} from './constants';
import {executeQuery, selectQuery, upsertQuery} from './genericDao';
import {
  CALL_TYPE_FIELD,
  CALL_TYPE_NON_CALL,
  PRE_CALL_RCPA,
} from '../configs/AppConstants';

//TODO check if is needed
export const getPlanForDateAndLocation = async (date, locationId) => {
  const planDetails = await selectQuery(
    'TourPlan',
    [toYyyyMmDd(date), locationId, 'syslv00000000000000000000000000000024'],
    ' WHERE planDateYyyyMmDd = ? and planLocationId = ? and activityType = ?',
  );
  console.log(planDetails);
  if (planDetails.length === 0) {
    return [];
  }
  const doctors = await selectQuery(
    DOCTOR_MASTER,
    [locationId],
    ' WHERE locationId = ?',
  );
  let doctorMap = {};
  doctors.forEach(doctor => (doctorMap[doctor.id] = doctor));
  planDetails.forEach(plan => (plan.doctor = doctorMap[plan.customerId]));
  return planDetails;
};

export const savePlanForDateAndLocation = async activities => {
  for (const activity of activities) {
    console.log(activity);
    const existingActivities = await selectQuery(
      TOUR_PLAN,
      [activity.id],
      'WHERE ID = ?',
    );
    if (existingActivities.length > 0) {
      let a = {
        ...existingActivities[0],
        status: activity.status,
        synced: 0,
      };
      await upsertQuery(
        TOUR_PLAN,
        [
          a.planId,
          a.visited,
          a.visitTime,
          a.visitTimeYyyyMmDd,
          a.remarks,
          a.status,
          a.synced,
          a.syncId,
          a.visitTypeId,
          a.isJoint,
          a.isRCPADone,
          a.attendeeId,
          a.isActive,
          a.activityType,
          a.activityTypeId,
          a.joineeReferenceId,
          a.planDate,
          a.planDateYyyyMm,
          a.planDateYyyyMmDd,
          a.planLocationId,
          a.planEmployeeId,
          a.customerId,
          a.planned,
          a.ncaDuration,
          a.id,
        ],
        'update',
      );
    } else {
      //Insert
      await upsertQuery(TOUR_PLAN, [
        activity.id,
        activity.planId,
        0,
        null,
        0,
        null,
        activity.status,
        0,
        null,
        null,
        0,
        0,
        null,
        1,
        activity.activityType,
        null,
        null,
        toDbDate(activity.planDate),
        toYyyyMm(activity.planDate),
        toYyyyMmDd(activity.planDate),
        activity.planLocationId,
        activity.employeeId,
        activity.doctor.id,
        activity.planned,
        null,
      ]);
    }
  }
  return activities;
};

export const getPlanSummaryForYearMonthAndLocation = async (
  date,
  locationId,
) => {
  let summary = {doctors: 0, chemists: 0, beats: 0, nca: 0, leaves: 0};
  const planned = await selectQuery(
    TOUR_PLAN,
    [toYyyyMm(date), locationId],
    'WHERE planDateYyyyMm = ? and planLocationId = ? and planned = 1',
  );
  let doctors = [];
  let ncaDates = [];
  planned.forEach(plan => {
    if (plan.customerId !== null && !doctors.includes(plan.customerId)) {
      doctors.push(plan.customerId);
    }
    console.log(plan.activityType);
    if (plan.activityType === CALL_TYPE_NON_CALL) {
      if (!ncaDates.includes(plan.planDateYyyyMmDd)) {
        ncaDates.push(plan.planDateYyyyMmDd);
      }
    }
  });

  summary.doctors = doctors.length;
  summary.nca = ncaDates.length;
  return summary;
};

export const loadAllNoncallActivities = async () => {
  return selectQuery(NAME_VALUE, ['NON_CALL_ACTIVITY'], 'WHERE type = ?');
};

export const saveNonCallActivities = async activities => {
  console.log(activities);
  for (const activity of activities) {
    const existingActivity = await selectQuery(
      TOUR_PLAN,
      [toYyyyMmDd(activity.planDate), activity.activityId],
      'where planDateYyyyMmDd = ? and activityTypeId = ?',
    );

    if (existingActivity.length > 0) {
      await upsertQuery(
        TOUR_PLAN,
        [
          generateId(),
          null,
          0,
          null,
          0,
          null,
          'D',
          0,
          null,
          null,
          0,
          0,
          null,
          1,
          CALL_TYPE_NON_CALL,
          activity.activityId,
          null,
          toDbDate(activity.planDate),
          toYyyyMm(activity.planDate),
          toYyyyMmDd(activity.planDate),
          activity.planLocationId,
          activity.employeeId,
          null,
          1,
        ],
        'update',
      );
    } else {
      await upsertQuery(TOUR_PLAN, [
        generateId(),
        null,
        0,
        null,
        0,
        null,
        'A',
        0,
        null,
        null,
        0,
        0,
        null,
        1,
        CALL_TYPE_NON_CALL,
        activity.activityId,
        null,
        toDbDate(activity.planDate),
        toYyyyMm(activity.planDate),
        toYyyyMmDd(activity.planDate),
        activity.planLocationId,
        activity.employeeId,
        null,
        1,
      ]);
    }
  }
  return activities;
};

export const loadNonCallActivitiesForDate = async (date, locationId) => {
  const activities = await selectQuery(
    TOUR_PLAN,
    [CALL_TYPE_NON_CALL, toYyyyMmDd(date), locationId],
    'where activityType = ? and planDateYyyyMmDd =? and planLocationId=?',
  );
  let activityMap = {};
  activities.forEach(
    activity => (activityMap[activity.activityTypeId] = activity),
  );
  const allActivities = await loadAllNoncallActivities();
  let nonCallActivities = [];
  allActivities.forEach(ac => {
    if (activityMap[ac.id] !== undefined) {
      ac.action = activityMap[ac.id].status;
      nonCallActivities.push(ac);
    }
  });
  return nonCallActivities;
};

export const getUnsyncedVisits = async () => {
  const visits = (await selectQuery(TOUR_PLAN, [0], 'where synced = ?')).map(
    visit => {
      return {
        activityType: visit.activityType,
        activityTypeId: visit.activityTypeId,
        attendeeId: visit.attendeeId,
        customerId: visit.customerId,
        dailyVisitId: visit.visitId,
        employeeId: visit.planEmployeeId,
        externalCode: visit.id,
        isActive: visit.isActive,
        isJoint: visit.isJoint,
        isPlanned: visit.planned,
        isRcpaDone: visit.isRcpaDone,
        isReported: visit.visited,
        isVideoShown: 0,
        joineeReferenceId: visit.joineeReferenceId,
        locationId: visit.planLocationId,
        monthlyPlanId: visit.planId,
        remarks: visit.remarks,
        visitTypeId: visit.visitTypeId,
        yyyyMmDd: visit.planDateYyyyMmDd,
        rcpaList: [],
        detailingList: [],
        digitalVisitData: [],
        joineeList: [],
        inputsList: [],
      };
    },
  );
  let visitsToReturn = [];
  for (let visit of visits) {
    const rcpa = await selectQuery(RCPA_DATA, [visit.id], 'where visitId = ?');
    visit.rcpaList = rcpa.map(row => {
      return {
        actionTaken: row.action,
        attendeeId: visit.attendeeId,
        brandId: row.brandId,
        chemistId: row.chemistId,
        competitionQuantity: row.compBrandQty,
        competitionRxn: row.compBrandRxns,
        competitionValue: row.compBrandValue,
        doctorId: row.doctorId,
        externalCode: row.id,
        quantity: row.brandQty,
        rcpaId: row.rcpaId,
        rxn: row.rxns,
        typeId: PRE_CALL_RCPA,
        value: row.rxnValue,
      };
    });
    visitsToReturn.push(visit);
  }
  console.log(visitsToReturn);
  return visitsToReturn;
};

export const getManagerDoctorLocation = async date => {
  const data = await executeQuery(
    'SELECT distinct t.planLocationId locationId from TeamTourPlan t inner join TourPlan p on p.joineeReferenceId = t.attendeeId where p.planDateYyyyMmDd = ? and p.status = ?',
    [toYyyyMmDd(date), 'A'],
  );
  let locationIds = [];
  for (let i = 0; i < data.rows.length; i++) {
    locationIds.push(data.rows.item(i).locationId);
  }
  return locationIds;
};

export const saveManagerDoctors = async (
  teamMembers,
  toDeletes,
  date,
  locationId,
  employeeId,
) => {
  try {
    for (const tm of teamMembers) {
      await executeQuery(
        'INSERT INTO TourPlan Select * from TeamTourPlan where planLocationId=? and planDateYyyyMmDd=? and planned = 1',
        [tm, toYyyyMmDd(date)],
      );
      await executeQuery(
        'UPDATE TourPlan set joineeReferenceId = attendeeId where planLocationId=? and planDateYyyyMmDd=? and planned = 1',
        [tm, toYyyyMmDd(date)],
      );
      await executeQuery(
        'UPDATE TourPlan set planId= null, attendeeId = null, status = ?, synced =0, planLocationId=?, planEmployeeId = ? where planLocationId=? and planDateYyyyMmDd=?',
        ['A', locationId, employeeId, tm, toYyyyMmDd(date)],
      );
    }
    for (const tm of toDeletes) {
      const tmPlan = await executeQuery(
        'SELECT distinct attendeeId as attendeeId from TeamTourPlan where planLocationId = ? and planDateYyyyMmDd = ?',
        [tm, toYyyyMmDd(date)],
      );
      for (let i = 0; i < tmPlan.rows.length; i++) {
        const attendeeId = tmPlan.rows.item(i).attendeeId;
        await executeQuery(
          'UPDATE TourPlan set synced = 0, status = ?  where joineeReferenceId = ?',
          ['D', attendeeId],
        );
        await executeQuery(
          'DELETE from TourPlan where status = ? and synced = 0',
          ['D'],
        );
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const updatePlanForZsm = async (visitId, visited) => {
  const existingStatus = await selectQuery(TOUR_PLAN, [visitId], 'where id=?');
  const status = existingStatus[0].status;
  await executeQuery(
    'UPDATE TourPlan set visited = ?, synced = 0, status = ? where id =? ',
    [visited, status === 'A' ? 'A' : 'U', visitId],
  );
};
