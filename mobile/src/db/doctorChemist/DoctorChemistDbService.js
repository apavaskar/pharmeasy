import {executeQuery, selectQuery, upsertQuery} from '../genericDao';
import {CHEMIST_MASTER, DOCTOR_CHEMIST, generateId} from '../constants';

export const loadChemistsForDoctorMapping = async doctorId => {
  const mappedChemists = await selectQuery(
    DOCTOR_CHEMIST,
    [doctorId],
    'where doctorId = ?',
  );
  let chemistMap = {};
  mappedChemists.forEach(c => (chemistMap[c.chemistId] = c));
  const allChemists = await selectQuery(CHEMIST_MASTER);
  return allChemists.map(c => {
    return {
      ...c,
      mapped: chemistMap[c.id] !== undefined,
    };
  });
};

export const removeChemistForDoctor = async (doctorId, chemistId) => {
  await executeQuery(
    'DELETE from DoctorChemists where doctorId=? and chemistId = ?',
    [doctorId, chemistId],
  );
  return await loadChemistsForDoctorMapping(doctorId);
};

export const addChemistForDoctor = async (doctorId, chemistId) => {
  await upsertQuery(DOCTOR_CHEMIST, [generateId(), doctorId, chemistId]);
  return await loadChemistsForDoctorMapping(doctorId);
};
