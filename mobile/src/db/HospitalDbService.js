import {
  executeQuery,
  selectAdhocQuery,
  selectQuery,
  upsertQuery,
} from './genericDao';
import {
  DOCTOR_MASTER,
  EMPLOYEE_PROFILE,
  generateId,
  HOSPITAL_DAILY_ENTRY,
  HOSPITAL_ENTRY,
  HOSPITAL_MASTER,
} from './constants';
import {toYyyyMm, toYyyyMmDd} from '../utils/dateUtil';

export const loadHospitalsForLocation = async locationId => {
  return await selectQuery(
    HOSPITAL_MASTER,
    [locationId],
    'WHERE locationId=? order by lower(name)',
  );
};

export const loadEntries = async (hospitalId, yyyyMm) => {
  return await selectQuery(
    HOSPITAL_ENTRY,
    [hospitalId, yyyyMm],
    'where hospitalId =? and YYYYMM = ? order by visitDate',
  );
};

export const saveHospitalEntry = async e => {
  const entry = await selectQuery(
    HOSPITAL_ENTRY,
    [e.hospitalId, e.visitDate],
    'where hospitalId =? and visitDate = ?',
  );
  if (entry.length === 0) {
    await upsertQuery(HOSPITAL_ENTRY, [
      generateId(),
      null,
      e.YYYYMM,
      e.hospitalId,
      'A',
      0,
      e.visitDateEntered,
      e.patientsICU,
      e.patients,
      e.patientOnInj,
      'submitted',
    ]);
  } else {
    await upsertQuery(
      HOSPITAL_ENTRY,
      [
        e.entryId,
        e.YYYYMM,
        e.hospitalId,
        e.entryId === null ? 'A' : 'U',
        0,
        e.visitDateEntered,
        e.patientsICU,
        e.patients,
        e.patientOnInj,
        'submitted',
        entry[0].id,
      ],
      'update',
    );
  }
};

export const deleteEntry = async (id, hospitalId, yyyymm) => {
  const data = await selectQuery(HOSPITAL_ENTRY, [id], 'WHERE ID = ?');
  if (data.entryId === undefined) {
    await executeQuery('DELETE from HospitalEntry where id = ?', [id]);
  } else {
    await executeQuery('UPDATE HospitalEntry set action = ? where id=?', [
      'D',
      id,
    ]);
  }
  return await loadEntries(hospitalId, yyyymm);
};

export const getDailyEntry = async (hospitalId, yyyyMmDd) => {
  const entries = await selectQuery(
    HOSPITAL_DAILY_ENTRY,
    [hospitalId, yyyyMmDd],
    'WHERE hospitalId=? and visitDate=?',
  );
  if (entries.length === 0) {
    return {};
  }
  const doctors = await selectQuery(DOCTOR_MASTER);
  let doctorMap = {};
  for (const doctor of doctors) {
    doctorMap[doctor.id] = doctor;
  }
  const entry = entries[0];
  if (entry.doctorId !== null) {
    entry.doctor = doctorMap[entry.doctorId];
  }
  return entries[0];
};

export const getDoctorsForHospital = async hospitalId => {
  return await selectAdhocQuery(
    'SELECT d.id doctorId, d.name name from DoctorMaster d inner join HospitalDoctors hd on hd.doctorId = d.id and hd.hospitalId = ? ',
    [hospitalId],
  );
};

export const saveDailyEntry = async entry => {
  if (entry.entryId === undefined || entry.entryId === null) {
    if (entry.id === null || entry.id === undefined) {
      await upsertQuery(HOSPITAL_DAILY_ENTRY, [
        generateId(),
        entry.entryId,
        toYyyyMm(entry.date),
        entry.hospitalId,
        'A',
        0,
        toYyyyMmDd(entry.date),
        entry.iv,
        entry.oral,
        entry.both,
        entry.doctorId,
        entry.adhocDoctor,
      ]);
    } else {
      await upsertQuery(
        HOSPITAL_DAILY_ENTRY,
        [
          entry.entryId,
          toYyyyMm(entry.date),
          entry.hospitalId,
          'A',
          0,
          toYyyyMmDd(entry.date),
          entry.iv,
          entry.oral,
          entry.both,
          entry.doctorId,
          entry.adhocDoctor,
          entry.id,
        ],
        'update',
      );
    }
  } else {
    await upsertQuery(
      HOSPITAL_DAILY_ENTRY,
      [
        entry.entryId,
        toYyyyMm(entry.date),
        entry.hospitalId,
        'U',
        0,
        toYyyyMmDd(entry.date),
        entry.iv,
        entry.oral,
        entry.both,
        entry.doctorId,
        entry.adhocDoctor,
        entry.id,
      ],
      'update',
    );
  }
  return await getDailyEntry(entry.hospitalId, toYyyyMmDd(entry.date));
};

export const getUnsyncedMonthlyHospitalVisits = async () => {
  const employee = (await selectQuery(EMPLOYEE_PROFILE, []))[0];
  return (await selectQuery(HOSPITAL_ENTRY, [0], 'where synced = ?')).map(
    row => {
      return {
        actionTaken: row.action,
        employeeId: employee.id,
        emrokPatients: row.patients,
        entityId: row.entryId,
        externalCode: row.id,
        hospitalId: row.hospitalId,
        icuPatients: row.patientsICU,
        locationId: employee.locationId,
        rcpaDate: row.visitDate,
        telcoplaninPatients: row.patientOnInj,
      };
    },
  );
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
      };
    },
  );
};

export const updateMonthlyHospitalVisitFromServer = async data => {
  const existingIds = (await selectQuery(HOSPITAL_ENTRY, [])).map(
    e => e.entryId,
  );
  for (const entry of data) {
    if (existingIds.includes(entry.entityId)) {
      await executeQuery('UPDATE HospitalEntry set status=? where entryId=?', [
        entry.status,
        entry.entityId,
      ]);
    } else {
      await upsertQuery(HOSPITAL_ENTRY, [
        generateId(),
        entry.entityId,
        0,
        entry.hospitalId,
        'N',
        1,
        0,
        entry.icuPatients,
        entry.emrokPatients,
        entry.teicoplaninPatients,
        entry.status,
      ]);
    }
  }
};

export const updateDailyHospitalVisitFromServer = async data => {
  const existingIds = (await selectQuery(HOSPITAL_DAILY_ENTRY, [])).map(
    e => e.entryId,
  );
  for (const entry of data) {
    if (existingIds.includes(entry.entityId)) {
      await executeQuery(
        'UPDATE HospitalDailyEntry set status=? where entryId=?',
        [entry.status, entry.entityId],
      );
    } else {
      await upsertQuery(HOSPITAL_DAILY_ENTRY, [
        generateId(),
        entry.entryId,
        0,
        entry.hospitalId,
        'N',
        1,
        0,
        entry.emrokIvPatients,
        entry.emrokOPatients,
        entry.bothPatients,
      ]);
    }
  }
};
