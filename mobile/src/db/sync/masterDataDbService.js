import {
  ADDRESS_MASTER,
  BEAT_MASTER,
  BRAND_MASTER,
  CHEMIST_MASTER,
  COMP_BRAND_MASTER,
  CONTACT_LIST,
  DETAILING_AID,
  DIGITAL_TEMPLATES,
  DOCTOR_CHEMIST,
  DOCTOR_MASTER,
  FOCUSED_BRAND,
  generateId,
  HOSPITAL_DOCTORS,
  HOSPITAL_MASTER,
  INPUT_INVENTORY,
  JOINEE_MASTER,
  MY_TEAM,
  NAME_VALUE,
  TEAM_TOUR_PLAN,
  TOUR_PLAN,
} from '../constants';
import {
  executeQuery,
  insertBulkQuery,
  selectQuery,
  upsertQuery,
} from '../genericDao';
import {insertIntoSyncLog} from '../SyncLogDbService';
import {CALL_TYPE_FIELD} from '../../configs/AppConstants';
import {toDbDate, toDbDateFromYyyyMmDd, toYyyyMm} from '../../utils/dateUtil';

export const saveMasterDb = async payload => {
  try {
    const startTime = new Date().getTime();
    const syncId = generateId();
    await insertIntoEmployeeProfile(payload.userProfile);
    await insertIntoSyncLog(syncId, 'MASTER_SYNC', 'EmployeeProfile', 1);

    await insertIntoBeatMaster(
      payload.beats,
      payload.userProfile.location.id,
      syncId,
    );
    await insertIntoSyncLog(
      syncId,
      'MASTER_SYNC',
      'Beats',
      payload.beats.length,
    );

    await insertIntoJoineeMaster(payload.joinees, syncId);
    await insertIntoSyncLog(
      syncId,
      'MASTER_SYNC',
      'Joinees',
      payload.joinees.length,
    );

    await insertIntoOwnBrand(payload.brands, syncId);
    await insertIntoSyncLog(
      syncId,
      'MASTER_SYNC',
      'Brands',
      payload.brands.length,
    );

    await insertIntoChemist(payload.chemists, syncId);
    await insertIntoSyncLog(
      syncId,
      'MASTER_SYNC',
      'Chemists',
      payload.chemists.length,
    );

    await insertIntoDoctor(payload.doctors, syncId);
    await insertIntoSyncLog(
      syncId,
      'MASTER_SYNC',
      'Doctors',
      payload.doctors.length,
    );

    await insertIntoDigitalTemplate(payload.marketingTemplates, syncId);
    await insertIntoSyncLog(
      syncId,
      'MASTER_SYNC',
      DIGITAL_TEMPLATES,
      payload.marketingTemplates.length,
    );

    await insertIntoSystemLov(
      payload.noncallActivities,
      syncId,
      'NON_CALL_ACTIVITY',
    );
    await insertIntoSyncLog(
      syncId,
      'MASTER_SYNC',
      'NON CALL ACTIVITIES',
      payload.noncallActivities.length,
    );

    await insertIntoSystemLov(payload.leaveTypes, syncId, 'LEAVE_TYPE');
    await insertIntoSyncLog(
      syncId,
      'MASTER_SYNC',
      'Leave Types',
      payload.leaveTypes.length,
    );

    await insertIntoInputInventory(
      payload.inventoryDetails,
      syncId,
      INPUT_INVENTORY,
    );

    await insertIntoHospitals(
      payload.hospitals,
      payload.userProfile.location.id,
      syncId,
      HOSPITAL_MASTER,
    );
    await insertIntoSyncLog(
      syncId,
      'MASTER_SYNC',
      'Hospitals',
      payload.hospitals.length,
    );

    await insertIntoMyTeam(payload.myTeam, syncId);
    await insertIntoSyncLog(
      syncId,
      'MASTER_SYNC',
      'My Team',
      payload.myTeam.length,
    );

    await insertIntoMyTourPlan(payload.myPlan, syncId);
    await insertIntoSyncLog(
      syncId,
      'MASTER_SYNC',
      'My Plan',
      payload.myPlan.length,
    );

    await saveTeamPlanForDateAndLocation(payload.myTeamPlan, syncId);
    await insertIntoSyncLog(
      syncId,
      'MASTER_SYNC',
      'My Team Plan',
      payload.myTeamPlan.length,
    );

    await saveJoineeData(
      payload.jointVisits,
      payload.userProfile.employee.id,
      payload.userProfile.location.id,
    );

    await insertIntoDetailingFiles(payload.vaFiles);
    await insertIntoSyncLog(
      syncId,
      'MASTER_SYNC',
      'Tour Plan',
      payload.jointVisits.length,
    );

    await insertIntoCRMStages(payload.crmStages);
    await insertIntoSyncLog(
      syncId,
      'MASTER_SYNC',
      'CRM Stages',
      payload.crmStages.length,
    );

    await insertIntoSystemLov(
      payload.specialities,
      syncId,
      'DOCTOR_SPECIALITY',
    );
    await insertIntoSyncLog(
      syncId,
      'MASTER_SYNC',
      'Doctor Speciality',
      payload.specialities.length,
    );

    await upsertQuery('AppInfo', [payload.certificate], 'update');
    await insertIntoSyncLog(
      syncId,
      'MASTER_SYNC',
      'Inputs',
      payload.inventoryDetails.length,
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const insertIntoEmployeeProfile = async userProfile => {
  await executeQuery('DELETE from EmployeeProfile');
  await upsertQuery('EmployeeProfile', [
    userProfile.employee.id,
    userProfile.employee.name,
    userProfile.location.id,
    userProfile.location.name,
    userProfile.jobTitle.id,
    userProfile.jobTitle.name,
    userProfile.empCode,
    userProfile.empDesignation,
    userProfile.userId,
  ]);
};

const insertIntoBeatMaster = async (beats, locationId, syncId) => {
  await executeQuery('DELETE from BeatMaster');
  let beatParams = [];
  let i = 0;
  for (const beat of beats) {
    beatParams.push(beat.id);
    beatParams.push(beat.name);
    beatParams.push(locationId);
    beatParams.push(syncId);
    if (i === 10) {
      await insertBulkQuery(BEAT_MASTER, beatParams);
      beatParams = [];
    }
    i++;
  }
  await insertBulkQuery(BEAT_MASTER, beatParams);
};

const insertIntoJoineeMaster = async (joinees, syncId) => {
  await executeQuery('DELETE from JoineeMaster');
  let joineeParams = [];
  for (const joinee of joinees) {
    joineeParams.push(joinee.employee.id);
    joineeParams.push(joinee.employee.name);
    joineeParams.push(joinee.location.id);
    joineeParams.push(joinee.location.name);
    joineeParams.push(joinee.jobRole.id);
    joineeParams.push(joinee.jobRole.name);
    joineeParams.push(syncId);
  }
  insertBulkQuery(JOINEE_MASTER, joineeParams);
};

const insertIntoOwnBrand = async (brands, syncId) => {
  await executeQuery('DELETE from OwnBrandMaster');
  await executeQuery('DELETE from CompBrandMaster');
  let brandParams = [];
  let cBrandParams = [];
  let i = 0;
  for (const brand of brands) {
    brandParams.push(brand.itemId);
    brandParams.push(brand.itemName);
    brandParams.push(brand.rxnUnits);
    brandParams.push(brand.rcpaValue);
    brandParams.push(syncId);
    brandParams.push(brand.showInRcpa);
    brandParams.push(brand.showInDetailing);
    if (i === 10) {
      insertBulkQuery(BRAND_MASTER, brandParams);
      insertBulkQuery(COMP_BRAND_MASTER, cBrandParams);
      brandParams = [];
      cBrandParams = [];
    }
    i++;
  }
  insertBulkQuery(BRAND_MASTER, brandParams);
  insertBulkQuery(COMP_BRAND_MASTER, cBrandParams);
};

const insertIntoChemist = async (chemists, syncId) => {
  await executeQuery('DELETE from ChemistMaster');
  await executeQuery('DELETE from DoctorChemists');
  let chemistParams = [];
  let doctorChemistParams = [];
  let numChemists = 0;
  for (const chemist of chemists) {
    chemistParams.push(chemist.chemist.id);
    chemistParams.push(chemist.chemist.name);
    chemistParams.push(chemist.personCode);
    chemistParams.push(chemist.location.id);
    chemistParams.push(syncId);
    if (chemist.doctorList !== undefined) {
      for (const doctor of chemist.doctorList) {
        doctorChemistParams.push(generateId());
        doctorChemistParams.push(doctor.id);
        doctorChemistParams.push(chemist.chemist.id);
      }
      await insertBulkQuery(DOCTOR_CHEMIST, doctorChemistParams);
      doctorChemistParams = [];
    }
    if (numChemists === 10) {
      console.log('------------INSERT !');
      await insertBulkQuery(CHEMIST_MASTER, chemistParams);
      chemistParams = [];
      numChemists = 0;
    }
    numChemists++;
  }
  console.log('------------INSERT !', doctorChemistParams.length);
  await insertBulkQuery(DOCTOR_CHEMIST, doctorChemistParams);
  await insertBulkQuery(CHEMIST_MASTER, chemistParams);
};

const insertIntoDoctor = async (doctors, syncId) => {
  await executeQuery('DELETE from DoctorMaster');
  await executeQuery('DELETE from AddressMaster');
  await executeQuery('DELETE from ContactListMaster');
  await executeQuery('DELETE from FocusedBrand');
  let beatMap = {};
  let doctorValues = [];
  let addressParams = [];
  let contactParams = [];
  let doctorBrandParams = [];
  let numDoctors = 0;
  for (const doctor of doctors) {
    doctorValues.push(doctor.doctor.id);
    doctorValues.push(doctor.doctor.name);
    doctorValues.push(doctor.beat.id);
    doctorValues.push(doctor.classification.id);
    doctorValues.push(doctor.location.id);
    doctorValues.push(doctor.personCode);
    doctorValues.push(doctor.reportingMode.id);
    doctorValues.push(doctor.speciality.id);
    doctorValues.push(syncId);
    for (const address of doctor.addressList) {
      addressParams.push(generateId());
      addressParams.push(doctor.doctor.id);
      addressParams.push(address.type.id);
      addressParams.push(address.type.name);
      addressParams.push(address.addressLine1);
      addressParams.push(address.addressLine2);
      addressParams.push(address.buildingName);
      addressParams.push(address.state.id);
      addressParams.push(address.state.name);
      addressParams.push(address.town.id);
      addressParams.push(address.town.name);
    }
    for (const contact of doctor.contactList) {
      contactParams.push(generateId());
      contactParams.push(doctor.doctor.id);
      contactParams.push(contact.type.id);
      contactParams.push(contact.type.name);
      contactParams.push(contact.contactDetail);
    }
    for (const fBrand of doctor.focusedBrands) {
      doctorBrandParams.push(generateId());
      doctorBrandParams.push(doctor.doctor.id);
      doctorBrandParams.push(fBrand.id);
    }
    const beat = doctor.beat;
    beat.locationId = doctor.location.id;
    beatMap[beat.id] = beat;
    if (numDoctors === 10) {
      await insertBulkQuery(DOCTOR_MASTER, doctorValues);
      await insertBulkQuery(ADDRESS_MASTER, addressParams);
      await insertBulkQuery(CONTACT_LIST, contactParams);
      await insertBulkQuery(FOCUSED_BRAND, doctorBrandParams);
      doctorValues = [];
      addressParams = [];
      contactParams = [];
      doctorBrandParams = [];
      numDoctors = 0;
    }
    numDoctors++;
  }
  await insertBulkQuery(DOCTOR_MASTER, doctorValues);
  await insertBulkQuery(ADDRESS_MASTER, addressParams);
  await insertBulkQuery(CONTACT_LIST, contactParams);
  await insertBulkQuery(FOCUSED_BRAND, doctorBrandParams);

  let beats = await selectQuery(BEAT_MASTER);
  if (beats.length === 0) {
    for (const [key, value] of Object.entries(beatMap)) {
      await upsertQuery(BEAT_MASTER, [
        value.id,
        value.name,
        value.locationId,
        syncId,
      ]);
    }
  }
};

const insertIntoDigitalTemplate = async (templates, syncId) => {
  await executeQuery('DELETE from DigitalTemplates');
  for (const template of templates) {
    await upsertQuery(DIGITAL_TEMPLATES, [
      template.id,
      template.brand.id,
      template.callType.id,
      template.templateText,
      syncId,
    ]);
  }
};

const insertIntoSystemLov = async (data, syncId, type) => {
  await executeQuery('DELETE from NameValue where type = ?', [type]);
  for (const val of data) {
    await upsertQuery(NAME_VALUE, [val.id, val.name, type]);
  }
};

const insertIntoInputInventory = async (data, syncId, type) => {
  await executeQuery('DELETE from InputInventory');
  let numInputs = 0;
  let inputs = [];
  for (const val of data) {
    inputs.push(generateId());
    inputs.push(val.id);
    inputs.push(val.stockId);
    inputs.push(val.code);
    inputs.push(val.name);
    inputs.push(val.type);
    inputs.push(val.batchNumber);
    inputs.push(val.inventoryDate);
    inputs.push(val.expiryDate);
    inputs.push(val.quantityAdded);
    inputs.push(val.distributed);
    inputs.push(val.balance);
    if (numInputs === 10) {
      await insertBulkQuery(INPUT_INVENTORY, inputs);
      inputs = [];
      numInputs = 0;
    }
    numInputs++;
  }
  await insertBulkQuery(INPUT_INVENTORY, inputs);
};

const insertIntoHospitals = async (data, locationId, syncId, type) => {
  await executeQuery('DELETE from HospitalMaster');
  await executeQuery('DELETE from HospitalDoctors');
  for (const h of data) {
    //id, code, name, locationId, icuBedCount, maxCapacity, targetPatients
    await upsertQuery(HOSPITAL_MASTER, [
      h.id,
      h.code,
      h.name,
      locationId,
      h.icuBeds,
      h.icuPatientCapacity,
      h.target,
    ]);
    for (const d of h.doctors) {
      await upsertQuery(HOSPITAL_DOCTORS, [h.id, d.doctorId]);
    }
  }
};

const insertIntoMyTeam = async (data, syncId) => {
  await executeQuery('DELETE from MyTeam');
  for (const team of data) {
    //id, name, locationId, locationName, jobRoleId, jobRoleName, syncId
    await upsertQuery(MY_TEAM, [
      team.employee.id,
      team.employee.name,
      team.location.id,
      team.location.name,
      team.jobRole.id,
      team.jobRole.name,
      syncId,
    ]);
  }
};

const insertIntoMyTourPlan = async (data, syncId) => {
  await executeQuery('DELETE FROM TourPlan where synced = 1');
  let plans = [];
  for (const row of data) {
    let i = 0;
    console.log('----------------------------------');
    console.log(row);
    console.log('----------------------------------');
    for (const att of row.attendeeList) {
      console.log('--------> inside', i, att);
      plans.push(generateId());
      plans.push(att.plan.id);
      plans.push(att.isReported);
      plans.push(null);
      plans.push(0);
      plans.push(att.remarks);
      plans.push('N');
      plans.push(1);
      plans.push(syncId);
      plans.push(att.visitType.id);
      plans.push(att.isJoint);
      plans.push(att.isRcpaDone);
      plans.push(att.attendeeID.id);
      plans.push(att.isActive);
      plans.push(att.activityType.id);
      plans.push(att.activityTypeId.id);
      plans.push(att.joineeReference.id);
      plans.push(null);
      plans.push(att.yyyyMm);
      plans.push(att.yyyyMmDd);
      plans.push(att.location.id);
      plans.push(att.employee.id);
      plans.push(att.customer.id);
      plans.push(att.isPlanned);
      plans.push(null);
      if (i === 10) {
        console.log('--------> inside insert', i);
        await insertBulkQuery(TOUR_PLAN, plans);
        plans = [];
        i = 0;
      }
      i++;
    }
    await insertBulkQuery(TOUR_PLAN, plans);
  }
  //await insertBulkQuery(TOUR_PLAN, plans);
};

const saveJoineeData = async (joinees, employeeId, locationId, syncId) => {
  let js = [];
  let i = 0;
  const existingEntries = await selectQuery(TOUR_PLAN);
  let existingMap = {};
  for (const i of existingEntries) {
    existingMap[i.customerId + '' + i.planDateYyyyMmDd] = i;
  }
  for (const j of joinees) {
    const key = j.customerId + '' + j.yyyyMmDd;
    if (existingMap[key] === undefined) {
      js.push(generateId());
      js.push(null);
      js.push(j.attendeeId !== null ? 1 : 0);
      js.push(null);
      js.push(0);
      js.push(null);
      js.push('N');
      js.push(1);
      js.push(syncId);
      js.push(null);
      js.push(0);
      js.push(false);
      js.push(j.attendeeId);
      js.push(1);
      js.push(CALL_TYPE_FIELD);
      js.push(null);
      js.push(null);
      js.push(toDbDateFromYyyyMmDd(j.yyyyMmDd));
      js.push((j.yyyyMmDd + '').substring(0, 6));
      js.push(j.yyyyMmDd);
      js.push(locationId);
      js.push(employeeId);
      js.push(j.customerId);
      js.push(1);
      js.push(0);
      if (i === 10) {
        await insertBulkQuery(TOUR_PLAN, js);
        i = 0;
        js = [];
      }
      i++;
    }
  }
  await insertBulkQuery(TOUR_PLAN, js);
};

export const saveTeamPlanForDateAndLocation = async (activities, syncId) => {
  await executeQuery(`DELETE from ${TEAM_TOUR_PLAN}`);
  for (const row of activities) {
    let plans = [];
    let numPlans = 0;
    for (const att of row.attendeeList) {
      plans.push(generateId());
      plans.push(att.plan.id);
      plans.push(att.isReported);
      plans.push(null);
      plans.push(0);
      plans.push(att.remarks);
      plans.push('N');
      plans.push(1);
      plans.push(syncId);
      plans.push(att.visitType.id);
      plans.push(att.isJoint);
      plans.push(att.isRcpaDone);
      plans.push(att.attendeeID.id);
      plans.push(att.isActive);
      plans.push(att.activityType.id);
      plans.push(att.activityTypeId.id);
      plans.push(att.joineeReference.id);
      plans.push(null);
      plans.push(att.yyyyMm);
      plans.push(att.yyyyMmDd);
      plans.push(att.location.id);
      plans.push(row.employee.id);
      plans.push(att.customer.id);
      plans.push(att.isPlanned);
      plans.push(null);
      if (numPlans === 10) {
        await insertBulkQuery(TEAM_TOUR_PLAN, plans);
        plans = [];
        numPlans = 0;
      }
      numPlans++;
    }
    await insertBulkQuery(TEAM_TOUR_PLAN, plans);
  }
  return activities;
};

export const insertIntoDetailingFiles = async files => {
  await executeQuery('DELETE from DetailingAid');
  for (const file of files) {
    //id, brandId, htmlContent, thumbnail, sequence, validFrom, validUpto
    await upsertQuery(DETAILING_AID, [
      file.fileId,
      file.brandId,
      null,
      null,
      file.sequence,
      toDbDate(Date()),
      null,
    ]);
  }
};

export const insertIntoCRMStages = async data => {
  await executeQuery('DELETE from ProductStages');
  for (const stage of data) {
    await upsertQuery('ProductStages', [
      stage.id.id,
      stage.product.id,
      stage.product.name,
      stage.stage.id,
      stage.stage.name,
      stage.sequence,
    ]);
  }
};

export const addDoctorToLocal = async data => {
  await upsertQuery(DOCTOR_MASTER, [
    data.id.id,
    data.name,
    data.beat.id,
    null,
    data.location.id,
    '',
    null,
    data.speciality.id,
    generateId(),
  ]);
};
