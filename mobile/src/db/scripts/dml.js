import {generateId} from '../constants';

export const dmlStatements = {
  '1.0': [
    {id: 21001, sql: 'DELETE FROM AppInfo'},
    {
      id: 21002,
      sql: `INSERT INTO AppInfo(id, app_version, auth_certificate) VALUES ('${generateId()}','1.0', '')`,
    },
  ],
  1.1: [
    {
      id: 21003,
      sql: "INSERT INTO NameValue(id, name, type) values ('RCPA', 'SingleCompetitor','APP_CONFIG')",
    },
  ],
  1.2: [
    {
      id: 21004,
      sql: "UPDATE AppInfo set app_Version = '1.2'",
    },
  ],
  1.5: [
    {
      id: 21005,
      sql: "UPDATE AppInfo set app_Version = '1.5'",
    },
  ],
  1.7: [
    {
      id: 21006,
      sql: 'UPDATE DoctorCoordinates set synced = 2',
    },
  ],
};

export const crudStatements = {
  AppInfo: {
    select: 'SELECT id, app_version, auth_certificate from AppInfo',
    update: 'UPDATE AppInfo set auth_certificate = ?',
  },
  EmployeeProfile: {
    select:
      'SELECT id, name, locationId, locationName, jobTitleId, jobTitleName, empCode, empDesignation, userId from EmployeeProfile',
    insert:
      'INSERT INTO EmployeeProfile(id, name, locationId, locationName, jobTitleId, jobTitleName, empCode, empDesignation, userId) values(?,?,?,?,?,?,?,?,?)',
    update:
      'UPDATE EmployeeProfile set name =? , locationId =?, locationName =?, jobTitleId = ?, jobTitleName= ?, empCode=?, empDesignation=?, userId = ? where id = ?',
  },
  BeatMaster: {
    inserts: '(?,?,?,?)',
    select: 'SELECT id, name, locationId, syncId from BeatMaster',
    insert: 'insert into BeatMaster(id, name, locationId, syncId) ',
  },
  SyncLog: {
    select:
      'SELECT id, type, objectName, countSynced, timeCreated, syncId from SyncLog',
    insert:
      'INSERT INTO SyncLog(id, type, objectName, countSynced, timeCreated, syncId) values(?, ?,?,?,?,?)',
  },
  JoineeMaster: {
    inserts: '(?,?,?,?,?,?,?)',
    select:
      'SELECT id, name, locationId, locationName, jobRoleId, jobRoleName, syncId from JoineeMaster',
    insert:
      'INSERT INTO  JoineeMaster(id, name, locationId, locationName, jobRoleId, jobRoleName, syncId)',
  },
  OwnBrandMaster: {
    inserts: '(?,?,?,?,?,?,?)',
    select:
      'SELECT id, name, rxUnits, rcpaValue, syncId, isRCPA, isDetailing from OwnBrandMaster',
    insert:
      'INSERT INTO OwnBrandMaster(id, name, rxUnits, rcpaValue, syncId, isRCPA, isDetailing)',
  },
  CompBrandMaster: {
    inserts: '(?,?,?,?,?,?)',
    select:
      'SELECT id, name, rxUnits, rcpaValue, ownBrandId, syncId from CompBrandMaster',
    insert:
      'INSERT INTO CompBrandMaster(id, name, rxUnits, rcpaValue, ownBrandId, syncId)',
  },
  ChemistMaster: {
    inserts: '(?,?,?,?,?)',
    select: 'SELECT id, name, personCode, locationId from ChemistMaster',
    insert:
      'INSERT INTO ChemistMaster(id, name, personCode, locationId, syncId)',
  },
  DoctorMaster: {
    inserts: '(?,?,?,?,?,?,?,?,?)',
    select:
      'SELECT id, name, beatId, classificationId, locationId, personCode, reportingMode, specialityId, syncId FROM DoctorMaster',
    insert:
      'INSERT into DoctorMaster(id, name, beatId, classificationId, locationId, personCode, reportingMode, specialityId, syncId)',
  },
  AddressMaster: {
    inserts: '(?,?,?,?,?,?,?,?,?,?,?)',
    select:
      'SELECT id, ownerId, typeId, typeName, addressLine1, addressLine2, buildingName, stateId, stateName, townId, townName from AddressMaster',
    insert:
      'INSERT INTO AddressMaster (id, ownerId, typeId, typeName, addressLine1, addressLine2, buildingName, stateId, stateName, townId, townName)',
  },
  ContactListMaster: {
    inserts: '(?,?,?,?,?)',
    select:
      'SELECT id, ownerId, typeId, typeName, contactDetail from ContactListMaster',
    insert:
      'INSERT INTO ContactListMaster(id, ownerId, typeId, typeName, contactDetail)',
  },
  FocusedBrand: {
    inserts: '(?,?,?)',
    select: 'SELECT id, doctorId, brandId from FocusedBrand',
    insert: 'INSERT INTO FocusedBrand(id, doctorId, brandId)',
  },
  DoctorChemists: {
    inserts: '(?,?,?)',
    select: 'SELECT id, doctorId, chemistId from DoctorChemists',
    insert: 'INSERT INTO DoctorChemists(id, doctorId, chemistId)',
  },
  TourPlan: {
    inserts:
      '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    select:
      'SELECT id,  planId, visited, visitTime, visitTimeYyyyMmDd, remarks, status, synced, syncId, visitTypeId, isJoint, isRCPADone, attendeeId, isActive, activityType, activityTypeId, joineeReferenceId, planDate, planDateYyyyMm, planDateYyyyMmDd, planLocationId, planEmployeeId, customerId, planned, ncaDuration from TourPlan',
    insert:
      'INSERT INTO TourPlan(id, planId, visited, visitTime, visitTimeYyyyMmDd, remarks, status, synced, syncId, visitTypeId, isJoint, isRCPADone, attendeeId, isActive, activityType, activityTypeId, joineeReferenceId, planDate, planDateYyyyMm, planDateYyyyMmDd, planLocationId, planEmployeeId, customerId, planned, ncaDuration )',
    update:
      'UPDATE TourPlan set planId =?, visited = ?, visitTime = ?, visitTimeYyyyMmDd =?, remarks =? , status =?, synced =?, syncId =?, visitTypeId =?, isJoint =?, isRCPADone =?, attendeeId =?, isActive =?, activityType =?, activityTypeId =?, joineeReferenceId =?, planDate =?, planDateYyyyMm =?, planDateYyyyMmDd =?, planLocationId =?, planEmployeeId =?, customerId =?, planned=?, ncaDuration =?  where id =?',
  },
  TeamTourPlan: {
    inserts:
      '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    select:
      'SELECT id,  planId, visited, visitTime, visitTimeYyyyMmDd, remarks, status, synced, syncId, visitTypeId, isJoint, isRCPADone, attendeeId, isActive, activityType, activityTypeId, joineeReferenceId, planDate, planDateYyyyMm, planDateYyyyMmDd, planLocationId, planEmployeeId, customerId, planned, ncaDuration from TeamTourPlan',
    insert:
      'INSERT INTO TeamTourPlan(id, planId, visited, visitTime, visitTimeYyyyMmDd, remarks, status, synced, syncId, visitTypeId, isJoint, isRCPADone, attendeeId, isActive, activityType, activityTypeId, joineeReferenceId, planDate, planDateYyyyMm, planDateYyyyMmDd, planLocationId, planEmployeeId, customerId, planned, ncaDuration)',
    update:
      'UPDATE TeamTourPlan set planId =? , visited = ?, visitTime = ?, visitTimeYyyyMmDd =?, remarks =? , status =?, synced =?, syncId =?, visitTypeId =?, isJoint =?, isRCPADone =?, attendeeId =?, isActive =?, activityType =?, activityTypeId =?, joineeReferenceId =?, planDate =?, planDateYyyyMm =?, planDateYyyyMmDd =?, planLocationId =?, planEmployeeId =?, customerId =?, planned=?  where id =?',
  },
  DigitalCallData: {
    select:
      'SELECT id, digitalVisitId, visitId, duration, action, templateId, visitModeId from DigitalCallData',
    insert:
      'INSERT INTO DigitalCallData(id, digitalVisitId, visitId, duration, action, templateId, visitModeId) values(?,?,?,?,?,?,?)',
  },
  RCPAData: {
    select:
      'SELECT id, visitId, doctorId, chemistId, rcpaDate, rcpaDateYyyyMmDd, brandId, isOwn, rxns, rxnValue, ownBrandId, action, compBrandRxns, compBrandValue, compBrandQty, brandQty, rcpaId from RCPAData',
    insert:
      'INSERT INTO RCPAData(id, visitId, doctorId, chemistId, rcpaDate, rcpaDateYyyyMmDd, brandId, isOwn, rxns, rxnValue, ownBrandId, action, compBrandRxns, compBrandValue, compBrandQty, brandQty, rcpaId) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    update:
      'UPDATE RCPAData set visitId = ?, doctorId = ?, chemistId=?, rcpaDate=?, rcpaDateYyyyMmDd=?, brandId=?, isOwn=?, rxns=?, rxnValue=?, ownBrandId=?, action=?,  compBrandRxns = ?, compBrandValue = ?, compBrandQty =?, brandQty = ?, rcpaId = ? where ID = ?',
  },
  BrandDetailing: {
    select:
      'SELECT id, detailingId, visitId, doctorId, brandId, detlSeq, action from BrandDetailing',
    insert:
      'INSERT INTO BrandDetailing(id, detailingId, visitId, doctorId, brandId, detlSeq, action) values (?,?,?,?,?,?,?)',
    update:
      'UPDATE BrandDetailing set detailingId =?, visitId =?, doctorId =?, brandId=?, detlSeq = ?, action =? where id =?',
  },
  DigitalTemplates: {
    select:
      'SELECT id, brandId, callType, templateText, syncId from DigitalTemplates',
    insert:
      'INSERT INTO DigitalTemplates(id, brandId, callType, templateText, syncId) values(?,?,?,?,?)',
  },
  NameValue: {
    select: 'SELECT ID, NAME, TYPE from NameValue',
    insert: 'INSERT INTO NameValue(ID, NAME, TYPE) values (?,?,?)',
  },
  NonCallActivity: {
    select:
      'SELECT id, planID, planDate, planDateYyyyMm, planDateYyyyMmDd, planLocationId, activityId, planned, visited, duration, visitTime, visitTimeYyyyMmDd, remarks, status, synced, syncId, visitTypeId from NonCallActivity',
    insert:
      'INSERT INTO NoncallActivity(id, planID, planDate, planDateYyyyMm, planDateYyyyMmDd, planLocationId, activityId, planned, visited, duration, visitTime, visitTimeYyyyMmDd, remarks, status, synced, syncId, visitTypeId) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    update:
      'UPDATE NoncallActivity set planID = ?, planDate = ?, planDateYyyyMm = ?, planDateYyyyMmDd = ?, planLocationId = ?, activityId = ?, planned = ?, visited = ?, duration = ?, visitTime = ?, visitTimeYyyyMmDd = ?, remarks = ?, status = ?, synced = ?, syncId = ?, visitTypeId = ? where id = ?',
  },
  LeaveHistory: {
    select:
      'SELECT ID, fromDate, toDate, fromDateYyyyMm, fromDateYyyyMmDd, toDateYyyyMm, toDateYyyyMmDd, STATUS from LeaveHistory',
    insert:
      'INSERT INTO LeaveHistory(ID, fromDate, toDate, fromDateYyyyMm, fromDateYyyyMmDd, toDateYyyyMm, toDateYyyyMmDd, STATUS) values (?,?,?,?,?,?,?,?)',
  },
  LeaveDetails: {
    select:
      'SELECT id, visitId, leaveDate, leaveDateYyyyMmDd, leaveDateYyyyMm from LeaveDetails',
    insert:
      'INSERT INTO LeaveDetails(id, visitId, leaveDate, leaveDateYyyyMmDd, leaveDateYyyyMm) values (?,?,?,?,?)',
  },
  VisitJoinees: {
    select:
      'SELECT id, attendeeId, joineeId, managerId, actionTaken, visitId from VisitJoinees',
    insert:
      'INSERT into VisitJoinees(id, attendeeId, joineeId, managerId, actionTaken, visitId) values (?,?,?,?,?,?)',
    update:
      'UPDATE VisitJoinees set attendeeId = ?, joineeId = ?, managerId = ?, actionTaken = ?, visitId = ? where id = ?',
  },
  InputInventory: {
    inserts: '(?,?,?,?,?,?,?,?,?,?,?,?)',
    select:
      'SELECT id, itemId, stockId, code, name, type, batchNumber, inventoryDate, expiryDate, quantityAdded, distributed, balance from InputInventory',
    insert:
      'INSERT INTO InputInventory(id, itemId, stockId, code, name, type, batchNumber, inventoryDate, expiryDate, quantityAdded, distributed, balance)',
    update:
      'UPDATE InputInventory set stockId = ?, code =?, name =?, type =?, batchNumber = ?, inventoryDate =?, expiryDate =?, quantityAdded =?, distributed = ?, balance = ? where id = ?',
  },
  HospitalMaster: {
    select:
      'SELECT id, code, name, locationId, icuBedCount, maxCapacity, targetPatients from HospitalMaster',
    insert:
      'INSERT INTO HospitalMaster(id, code, name, locationId, icuBedCount, maxCapacity, targetPatients) values(?,?,?,?,?,?,?)',
  },
  HospitalEntry: {
    select:
      'SELECT id, entryId, YYYYMM, hospitalId, action, synced, visitDate, patientsICU, patients, patientOnInj, status from HospitalEntry',
    insert:
      'INSERT INTO HospitalEntry(id, entryId, YYYYMM, hospitalId, action, synced, visitDate, patientsICU, patients, patientOnInj, status) values(?,?,?,?,?,?,?,?,?,?,?)',
    update:
      'UPDATE HospitalEntry set entryId=?, YYYYMM=?, hospitalId=?, action=?, synced=?, visitDate=?, patientsICU=?, patients=?, patientOnInj=?, status =?  where id=?',
  },
  HospitalDailyEntry: {
    select:
      'SELECT id, entryId, YYYYMM, hospitalId, action, synced, visitDate, iv, oral, both, doctorId, doctorName from HospitalDailyEntry',
    insert:
      'INSERT INTO HospitalDailyEntry(id, entryId, YYYYMM, hospitalId, action, synced, visitDate, iv, oral, both, doctorId, doctorName) values(?,?,?,?,?,?,?,?,?,?,?,?)',
    update:
      'UPDATE HospitalDailyEntry set entryId=?, YYYYMM=?, hospitalId=?, action=?, synced=?, visitDate=?, iv=?, oral=?, both=?, doctorId = ?, doctorName = ? where id=?',
  },
  HospitalApproval: {
    select:
      'SELECT id, locationId, locationName, hospitalId, hospitalName, icuBedCount, maxCapacity, targetPatients, patientsICU, patients, patientOnInj, status, synced from HospitalApproval',
  },
  MyTeam: {
    select:
      'SELECT id, name, locationId, locationName, jobRoleId, jobRoleName, syncId from MyTeam',
    insert:
      'INSERT INTO MyTeam(id, name, locationId, locationName, jobRoleId, jobRoleName, syncId) values (?,?,?,?,?,?,?)',
  },
  InputDistribution: {
    inserts: '(?,?,?,?,?,?)',
    select:
      'SELECT id, visitId, inputId, serverId, action, quantity from InputDistribution',
    insert:
      'INSERT INTO InputDistribution(id, visitId, inputId, serverId, action, quantity ) ',
  },
  HospitalDoctors: {
    inserts: '(?,?)',
    select: 'SELECT hospitalId, doctorId from HospitalDoctors',
    insert: 'INSERT into HospitalDoctors (hospitalId, doctorId)',
  },
  DetailingAid: {
    inserts: '(?,?,?,?,?,?,?)',
    select:
      'SELECT id, brandId, htmlContent, thumbnail, sequence, validFrom, validUpto from DetailingAid',
    insert:
      'INSERT INTO DetailingAid(id, brandId, htmlContent, thumbnail, sequence, validFrom, validUpto)',
  },
  PreCallPlan: {
    inserts: '(?,?,?,?)',
    select: 'SELECT id, visitId, fileId, seq from PreCallPlan',
    insert: 'INSERT INTO PreCallPlan(id, visitId, fileId, seq)',
  },
  DoctorCoordinates: {
    inserts: '(?,?,?,?,?,?)',
    select:
      'SELECT id, doctorId, longitude, latitude, isPrimary, synced from DoctorCoordinates',
    insert:
      'insert into DoctorCoordinates(id, doctorId, longitude, latitude, isPrimary, synced)',
  },
  ProductStages: {
    inserts: '(?,?,?,?,?,?)',
    select:
      'SELECT ID, PRODUCT_ID, PRODUCT_NAME, STAGE_ID, STAGE_NAME, DISPLAY_SEQUENCE from ProductStages',
    insert:
      'insert into ProductStages(ID, PRODUCT_ID, PRODUCT_NAME, STAGE_ID, STAGE_NAME, DISPLAY_SEQUENCE)',
  },
  CrmStage: {
    inserts: '(?,?,?,?,?,?)',
    select:
      'SELECT ID, ACTIVITY_ID, PRODUCT_ID, STAGE_ID, IS_DROP, IS_ENGAGEMENT from CrmStage',
    insert:
      'INSERT into CrmStage(ID, ACTIVITY_ID, PRODUCT_ID, STAGE_ID, IS_DROP, IS_ENGAGEMENT)',
  },
  DetailingStats: {
    inserts: '(?,?,?,?,?)',
    select:
      'SELECT id, visitId, fileId, timeSpent, sequence from DetailingStats',
    insert:
      'INSERT into DetailingStats(id, visitId, fileId, timeSpent, sequence)',
  },
  CRMLatestStage: {
    inserts: '(?, ?, ?, ?, ?, ?)',
    select:
      'SELECT id, doctorId, productId, stageId, dropped, synced from CRMLatestStage',
    insert:
      'INSERT INTO CRMLatestStage(id, doctorId, productId, stageId, dropped, synced)',
  },
};
