export const statements = {
  '1.0': [
    {
      id: 11001,
      sql: 'CREATE TABLE IF NOT EXISTS AppInfo(id TEXT PRIMARY KEY, app_version TEXT, auth_certificate TEXT )',
    },
    {
      id: 11002,
      sql: 'CREATE TABLE IF NOT EXISTS EmployeeProfile(id TEXT primary key, name TEXT, locationId TEXT, locationName TEXT, jobTitleId TEXT, jobTitleName TEXT, empCode TEXT, empDesignation TEXT, userId TEXT)',
    },
    {
      id: 11003,
      sql: 'CREATE TABLE IF NOT EXISTS SyncLog (id TEXT primary key, type TEXT, objectName TEXT, countSynced integer, timeCreated INTEGER, syncId TEXT)',
    },
    {
      id: 11004,
      sql: 'CREATE TABLE IF NOT EXISTS BeatMaster(id TEXT primary key, name TEXT, locationId TEXT, syncId TEXT)',
    },
    {
      id: 11005,
      sql: 'CREATE TABLE IF NOT EXISTS JoineeMaster(id TEXT primary key, name TEXT, locationId TEXT, locationName TEXT, jobRoleId TEXT, jobRoleName TEXT, syncId TEXT)',
    },
    {
      id: 11006,
      sql: 'CREATE TABLE IF NOT EXISTS OwnBrandMaster(id TEXT primary key, name TEXT, rxUnits INTEGER, rcpaValue DOUBLE, syncId TEXT)',
    },
    {
      id: 11007,
      sql: 'CREATE TABLE IF NOT EXISTS CompBrandMaster(id TEXT primary key, name TEXT, rxUnits INTEGER, rcpaValue DOUBLE, ownBrandId TEXT, syncId TEXT)',
    },
    {
      id: 11008,
      sql: 'CREATE TABLE IF NOT EXISTS ChemistMaster(id TEXT primary key, name TEXT, personCode TEXT, locationId TEXT, syncId TEXT )',
    },
    {
      id: 11009,
      sql: 'CREATE TABLE IF NOT EXISTS DoctorMaster(id TEXT primary key, name TEXT, beatId TEXT, classificationId TEXT, locationId TEXT, personCode TEXT, reportingMode TEXT, specialityId TEXT, syncId TEXT)',
    },
    {
      id: 11010,
      sql: 'CREATE TABLE IF NOT EXISTS AddressMaster(id TEXT primary key, ownerId TEXT, typeId TEXT, typeName TEXT, addressLine1 TEXT, addressLine2 TEXT, buildingName TEXT, stateId TEXT, stateName TEXT, townId TEXT, townName TEXT)',
    },
    {
      id: 11011,
      sql: 'CREATE TABLE IF NOT EXISTS ContactListMaster(id TEXT primary key, ownerId TEXT, typeId TEXT, typeName TEXT, contactDetail TEXT)',
    },
    {
      id: 11012,
      sql: 'CREATE TABLE IF NOT EXISTS FocusedBrand(id TEXT primary key, doctorId TEXT, brandId TEXT)',
    },
    {
      id: 11013,
      sql: 'CREATE TABLE IF NOT EXISTS DoctorChemists(id TEXT primary key, doctorId TEXT, chemistId TEXT)',
    },
    {
      id: 11014,
      sql: 'CREATE TABLE IF NOT EXISTS TourPlan(id TEXT primary key, planId TEXT, attendeeId TEXT, planDate TEXT, planDateYyyyMm INTEGER, planDateYyyyMmDd Integer, planLocationId TEXT, planEmployeeId TEXT, customerId TEXT, planned INTEGER, visited INTEGER, visitTime TEXT, visitTimeYyyyMmDd INTEGER, remarks TEXT, status TEXT, synced INTEGER, syncId TEXT, visitTypeId TEXT, isJoint INTEGER, isRCPADone INTEGER, isActive INTEGER, activityType TEXT, activityTypeId TEXT, joineeReferenceId TEXT)',
    },
    {
      id: 11015,
      sql: 'CREATE TABLE IF NOT EXISTS DigitalCallData(id TEXT primary key, digitalVisitId TEXT, visitId TEXT, duration DOUBLE, action TEXT, templateId TEXT, visitModeId TEXT )',
    },
    {
      id: 11016,
      sql: 'CREATE TABLE IF NOT EXISTS RCPAData(id TEXT primary key, visitId TEXT, doctorId TEXT, chemistId TEXT, rcpaDate TEXT, rcpaDateYyyyMmDd INTEGER, brandId TEXT, isOwn INTEGER, rxns INTEGER, rxnValue DOUBLE, ownBrandId TEXT, action TEXT, compBrandRxns INTEGER, compBrandValue DOUBLE, compBrandQty DOUBLE, brandQty DOUBLE, rcpaId TEXT)',
    },
    {
      id: 11017,
      sql: 'CREATE TABLE IF NOT EXISTS BrandDetailing(id  TEXT primary key, detailingId TEXT, visitId TEXT, doctorId TEXT, brandId TEXT, detlSeq INTEGER, action TEXT)',
    },
    {
      id: 11018,
      sql: 'CREATE TABLE IF NOT EXISTS DigitalTemplates(id TEXT primary key, brandId TEXT, callType TEXT, templateText TEXT, syncId TEXT)',
    },
    {
      id: 11020,
      sql: 'CREATE TABLE IF NOT EXISTS NameValue(id TEXT, name TEXT, type TEXT)',
    },
    {
      id: 11021,
      sql: 'CREATE TABLE IF NOT EXISTS NonCallActivity(id TEXT, planID TEXT, planDate TEXT, planDateYyyyMm INTEGER, planDateYyyyMmDd INTEGER, planLocationId TEXT, activityId TEXT, planned INTEGER, visited INTEGER, duration DOUBLE, visitTime TEXT, visitTimeYyyyMmDd INTEGER, remarks TEXT, status TEXT, synced INTEGER, syncId TEXT, visitTypeId TEXT)',
    },
  ],
  1.1: [
    {
      id: 11022,
      sql: 'CREATE TABLE IF NOT EXISTS LeaveHistory(id TEXT, fromDate TEXT, toDate TEXT, fromDateYyyyMm INTEGER, fromDateYyyyMmDd INTEGER, toDateYyyyMm INTEGER, toDateYyyyMmDd INTEGER, STATUS TEXT)',
    },
    {
      id: 11023,
      sql: 'CREATE TABLE IF NOT EXISTS LeaveDetails(id TEXT, visitId TEXT, leaveDate TEXT, leaveDateYyyyMmDd INTEGER, leaveDateYyyyMm INTEGER)',
    },
    {
      id: 11024,
      sql: 'CREATE TABLE IF NOT EXISTS VisitJoinees(id TEXT, attendeeId TEXT, joineeId TEXT, managerId TEXT, actionTaken TEXT, visitId TEXT)',
    },
    {
      id: 11025,
      sql: 'CREATE TABLE IF NOT EXISTS InputInventory(id TEXT, stockId TEXT, code TEXT, name TEXT, type TEXT, batchNumber TEXT, inventoryDate INTEGER, expiryDate INTEGER, quantityAdded INTEGER, distributed INTEGER, balance INTEGER)',
    },
    {
      id: 11026,
      sql: 'CREATE TABLE IF NOT EXISTS HospitalMaster(id TEXT, code TEXT, name TEXT, locationId TEXT, icuBedCount INTEGER, maxCapacity INTEGER, targetPatients INTEGER)',
    },
    {
      id: 11027,
      sql: 'CREATE TABLE IF NOT EXISTS HospitalEntry(id TEXT, entryId TEXT, YYYYMM INTEGER, hospitalId TEXT, action TEXT, synced INTEGER, visitDate INTEGER, patientsICU INTEGER, patients INTEGER, patientOnInj INTEGER, status TEXT)',
    },
    {
      id: 11028,
      sql: 'CREATE TABLE IF NOT EXISTS HospitalDailyEntry(id TEXT, entryId TEXT, YYYYMM INTEGER, hospitalId TEXT, action TEXT, synced INTEGER, visitDate INTEGER, iv INTEGER, oral INTEGER, both INTEGER)',
    },
    {
      id: 11029,
      sql: 'CREATE TABLE IF NOT EXISTS HospitalApproval(id TEXT, locationId TEXT, locationName TEXT, hospitalId TEXT, hospitalName TEXT,  icuBedCount INTEGER, maxCapacity INTEGER, targetPatients INTEGER,  patientsICU INTEGER, patients INTEGER, patientOnInj INTEGER, status TEXT, synced INTEGER)',
    },
    {
      id: 11030,
      sql: 'CREATE TABLE IF NOT EXISTS MyTeam(id TEXT, name TEXT, locationId TEXT, locationName TEXT, jobRoleId TEXT, jobRoleName TEXT, syncId TEXT)',
    },
    {
      id: 11031,
      sql: 'CREATE TABLE IF NOT EXISTS TeamTourPlan(id TEXT primary key, planId TEXT, attendeeId TEXT, planDate TEXT, planDateYyyyMm INTEGER, planDateYyyyMmDd Integer, planLocationId TEXT, planEmployeeId TEXT, customerId TEXT, planned INTEGER, visited INTEGER, visitTime TEXT, visitTimeYyyyMmDd INTEGER, remarks TEXT, status TEXT, synced INTEGER, syncId TEXT, visitTypeId TEXT, isJoint INTEGER, isRCPADone INTEGER, isActive INTEGER, activityType TEXT, activityTypeId TEXT, joineeReferenceId TEXT)',
    },
  ],
  1.2: [
    {
      id: 11032,
      sql: 'ALTER TABLE TourPlan add column ncaDuration TEXT',
    },
    {
      id: 11032,
      sql: 'ALTER TABLE TeamTourPlan add column ncaDuration TEXT',
    },
    {
      id: 11033,
      sql: 'ALTER TABLE OwnBrandMaster add column isRCPA INTEGER',
    },
    {
      id: 11034,
      sql: 'ALTER TABLE OwnBrandMaster add column isDetailing INTEGER',
    },
    {
      id: 11035,
      sql: 'CREATE TABLE IF NOT EXISTS InputDistribution ( id TEXT, visitId TEXT, inputId TEXT, serverId TEXT, action TEXT, quantity INTEGER)',
    },
    {
      id: 11036,
      sql: 'ALTER TABLE InputInventory add column itemId TEXT',
    },
  ],
  1.3: [
    {
      id: 11037,
      sql: 'CREATE TABLE IF NOT EXISTS HospitalDoctors(hospitalId TEXT, doctorId TEXT)',
    },
    {
      id: 11038,
      sql: 'alter table HospitalDailyEntry ADD COLUMN doctorId TEXT',
    },
    {
      id: 11039,
      sql: 'alter table HospitalDailyEntry ADD COLUMN doctorName TEXT',
    },
  ],
  1.4: [
    {
      id: 11040,
      sql: 'CREATE TABLE IF NOT EXISTS DetailingAid(id TEXT, brandId TEXT, htmlContent TEXT, thumbnail TEXT, sequence TEXT, validFrom INT, validUpto Int)',
    },
    {
      id: 11041,
      sql: 'CREATE TABLE IF NOT EXISTS PreCallPlan(id TEXT, visitId TEXT, fileId TEXT, seq INT)',
    },
  ],
  1.5: [
    {
      id: 11042,
      sql: 'CREATE TABLE IF NOT EXISTS DoctorCoordinates(id TEXT, doctorId TEXT, longitude DOUBLE, latitude DOUBLE, isPrimary BOOLEAN, SYNCED INTEGER)',
    },
    {
      id: 11043,
      sql: 'CREATE TABLE IF NOT EXISTS ProductStages(ID TEXT, PRODUCT_ID TEXT, PRODUCT_NAME TEXT, STAGE_ID TEXT, STAGE_NAME TEXT, DISPLAY_SEQUENCE INTEGER)',
    },
    {
      id: 11044,
      sql: 'CREATE TABLE IF NOT EXISTS CrmStage(ID TEXT, ACTIVITY_ID TEXT, PRODUCT_ID TEXT, STAGE_ID TEXT, IS_DROP BOOL, IS_ENGAGEMENT BOOL)',
    },
  ],
  1.6: [
    {
      id: 11045,
      sql: 'CREATE TABLE IF NOT EXISTS DetailingStats(id TEXT, visitId TEXT, fileId TEXT, timeSpent INTEGER, sequence INTEGER)',
    },
    {
      id: 11046,
      sql: 'CREATE TABLE IF NOT EXISTS CRMLatestStage(id TEXT, doctorId TEXT, productId TEXT, stageId TEXT, dropped BOOL, synced BOOL)',
    },
  ],
  1.7: [
    {
      id: 11047,
      sql: 'alter table TourPlan add column coordinateId TEXT',
    },
  ],
};
