import {
  BRAND_MASTER,
  CHEMIST_MASTER,
  COMP_BRAND_MASTER,
  CONTACT_LIST,
  DOCTOR_CHEMIST,
  DOCTOR_COORDINATES,
  DOCTOR_MASTER,
  NAME_VALUE,
} from './constants';
import {executeQuery, selectAdhocQuery, selectQuery} from './genericDao';

export const loadMyBeats = async locationId => {
  const beats = await selectQuery(
    'BeatMaster',
    [locationId],
    'WHERE locationId = ?',
  );
  return beats;
};

export const loadMyDoctors = async locationId => {
  //const doctors = await selectQuery(DOCTOR_MASTER, [], 'order BY NAME');
  return await selectAdhocQuery(
    'SELECT d.id id, d.name name, beatId, classificationId, d.locationId locationId, personCode, reportingMode, specialityId, d.syncId syncId, b.name beatName FROM DoctorMaster d inner join BeatMaster b on d.beatId = b.id order by name',
  );
};

export const loadDoctorsForBeats = async beats => {
  let doctors = [];
  for (let i = 0; i < beats.length; i++) {
    const d = await selectQuery(DOCTOR_MASTER, [beats[i]], 'WHERE beatId = ?');
    doctors = [...doctors, ...d];
  }
  return doctors;
};

export const restoreDoctor = async doctorId => {
  const doctor = (
    await selectQuery(DOCTOR_MASTER, [doctorId], 'WHERE ID = ?')
  )[0];
  const contactList = await selectQuery(
    CONTACT_LIST,
    [doctorId],
    'where ownerId = ?',
  );
  const coordinates = await selectQuery(
    DOCTOR_COORDINATES,
    [doctorId],
    'where doctorId = ? and synced != 2',
  );
  doctor.contacts = contactList;
  doctor.coordinates = coordinates;
  return doctor;
};

export const loadChemistForDoctor = async doctorId => {
  const chemistIds = (
    await selectQuery(DOCTOR_CHEMIST, [doctorId], 'Where doctorId = ?')
  ).map(id => id.chemistId);
  let chemists = await selectQuery(CHEMIST_MASTER, []);
  return chemists.filter(chemist => chemistIds.includes(chemist.id));
};

export const loadAllBrands = async () => {
  const brands = await selectQuery(BRAND_MASTER, []);
  let brandList = [];
  for (let brand of brands) {
    const compBrands = await selectQuery(
      COMP_BRAND_MASTER,
      [brand.id],
      'WHERE ownBrandId = ? ',
    );
    brandList.push(brand);
    compBrands.forEach(cBrand => brandList.push(cBrand));
  }
  return brandList;
};

export const loadAllConfigs = async () => {
  return await selectQuery(NAME_VALUE, ['APP_CONFIG'], 'WHERE type = ?');
};

export const loadDoctorSpecialityConfigs = async () => {
  return await selectQuery(NAME_VALUE, ['DOCTOR_SPECIALITY'], 'WHERE type = ?');
};

export const removeAuthCertificate = async () => {
  return await executeQuery('UPDATE AppInfo set auth_certificate = null');
};

export const loadSystemConfigs = async () => {
  return await selectQuery(NAME_VALUE, ['APP_CONFIG'], 'WHERE type = ?');
};
