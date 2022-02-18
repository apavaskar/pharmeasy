import {selectAdhocQuery, selectQuery, upsertQuery} from '../genericDao';
import {toDbDate, toYyyyMm, toYyyyMmDd} from '../../utils/dateUtil';
import {
  DOCTOR_MASTER,
  generateId,
  NAME_VALUE,
  NON_CALL_ACTIVITY,
  TOUR_PLAN,
} from '../constants';
import {CALL_TYPE_FIELD, CALL_TYPE_NON_CALL} from '../../configs/AppConstants';

export const getPlannedDoctorsForDateAndLocation = async (date, locationId) => {
  const planDetails = await selectAdhocQuery(
    'SELECT T.id id,  planId, visited, visitTime, visitTimeYyyyMmDd, remarks, status, synced, T.syncId syncId, ' +
      'visitTypeId, isJoint, isRCPADone, attendeeId, isActive, activityType, activityTypeId, joineeReferenceId, ' +
      'planDate, planDateYyyyMm, planDateYyyyMmDd, planLocationId, planEmployeeId, customerId, planned, d.name doctorName, ' +
      ' ncaDuration, b.id beatId, b.name beatName from TourPlan T inner join DoctorMaster d ' +
      ' on d.id = T.customerId inner join BeatMaster b on ' +
      ' b.id = d.beatId where planDateyyyyMmDd = ? ' +
      ' and status != ? and activityType = ? ',
    [toYyyyMmDd(date), 'D', CALL_TYPE_FIELD],
  );
  const coordinates = await selectAdhocQuery(
    'select t.customerId doctorId, count(d.id) cnt from TourPlan T ' +
      ' inner join DoctorCoordinates d on d.doctorId = t.customerId ' +
      '  where planDateyyyyMmDd = ?  and status != ? and activityType = ? group by t.customerId ',
    [toYyyyMmDd(date), 'D', CALL_TYPE_FIELD],
  );
  let doctorCountMap = {};
  for (const count of coordinates) {
    doctorCountMap[count.doctorId] = count.cnt;
  }
  return planDetails.map(p => {
    return {
      ...p,
      doctor: {id: p.customerId, name: p.doctorName},
      beat: {id: p.beatId, name: p.beatName},
      coordinates:
        doctorCountMap[p.customerId] === undefined
          ? 0
          : doctorCountMap[p.customerId],
    };
  });
};

export const getPlannedNCAForDateAndLocation = async (date, locationId) => {
  const planDetails = await selectQuery(
    'TourPlan',
    [toYyyyMmDd(date), locationId, CALL_TYPE_NON_CALL],
    ' WHERE planDateYyyyMmDd = ? and planLocationId = ? and activityType = ?',
  );
  if (planDetails.length === 0) {
    return [];
  }
  const activities = await selectQuery(
    NAME_VALUE,
    ['NON_CALL_ACTIVITY'],
    ' WHERE type = ?',
  );
  let activityMap = {};
  activities.forEach(a => (activityMap[a.id] = a));
  planDetails.forEach(
    plan => (plan.activity = activityMap[plan.activityTypeId]),
  );
  return planDetails;
};

export const addUnplannedDoctors = async (
  doctors,
  date,
  locationId,
  employeeId,
) => {
  for (const doctor of doctors) {
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
      CALL_TYPE_FIELD,
      null,
      null,
      null,
      toYyyyMm(date),
      toYyyyMmDd(date),
      locationId,
      employeeId,
      doctor.id,
      0,
    ]);
  }
  return await getPlannedDoctorsForDateAndLocation(date, locationId);
};

export const addUnplannedNonCallActivities = async (
  reportingDate,
  locationId,
  activities,
) => {
  console.log(activities);
  for (const activity of activities) {
    const existingActivity = await selectQuery(
      TOUR_PLAN,
      [toYyyyMmDd(activity.planDate), activity.activityId],
      'where planDateYyyyMmDd = ? and activityTypeId = ?',
    );
    if (existingActivity.length === 0) {
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
        activity.planEmployeeId,
        null,
        1,
      ]);
    }
  }
  console.log('FETCH-=======>', reportingDate, locationId);
  return getPlannedNCAForDateAndLocation(reportingDate, locationId);
};
