import {
  executeQuery,
  selectAdhocQuery,
  selectQuery,
  upsertQuery,
} from './genericDao';
import {
  BRAND_DETAILING,
  DIGITAL_CALL_DATA,
  DIGITAL_TEMPLATES,
  DOCTOR_COORDINATES,
  generateId,
  INPUT_DISTRIBUTION,
  RCPA_DATA,
  TOUR_PLAN,
  VISIT_JOINEES,
} from './constants';
import {toDbDate, toTimeStamp, toYyyyMmDd} from '../utils/dateUtil';
import {DIGITAL_CALL, PHYSICAL_CALL} from '../configs/AppConstants';

export const saveDigitalCall = async callData => {
  //id, digitalVisitId, visitId, duration, action, templateId, visitModeId
  await upsertQuery(DIGITAL_CALL_DATA, [generateId(), '', '', 2, 'F', '', '']);
  return {vcDone: true};
};

export const loadTemplatesForBrandAndType = async (brandId, type) => {
  return await selectQuery(
    DIGITAL_TEMPLATES,
    [brandId, type],
    'WHERE brandId = ? and callType = ?',
  );
};

export const saveDoctorCoordinatesToDb = async payload => {
  console.log('SAVING COOR', payload);
  await upsertQuery(DOCTOR_COORDINATES, [
    generateId(),
    payload.doctorId,
    payload.longitude,
    payload.latitude,
    payload.isPrimary,
    0,
  ]);
  return await selectQuery(
    DOCTOR_COORDINATES,
    [payload.doctorId],
    'where doctorId = ?',
  );
};

export const saveDoctorCall = async (
  visitId,
  joinees,
  rcpa,
  brands,
  inputs,
  comments,
  crm,
  saveCoordinates,
  coordinates,
) => {
  const visit = await selectAdhocQuery(
    'SELECT status, customerId from TourPlan where id = ?',
    [visitId],
  );
  await executeQuery(
    'UPDATE TourPlan set visited = ?, synced = ?, ' +
      ' visitTime = ?, visitTimeYyyyMmDd = ?, remarks =?, status = ?, visitTypeId=?, coordinateId=? where id = ? ',
    [
      1,
      0,
      new Date().getTime(),
      toYyyyMmDd(Date()),
      comments,
      visit[0].status === 'A' ? 'A' : 'U',
      PHYSICAL_CALL,
      `${coordinates.longitude},${coordinates.latitude}`,
      visitId,
    ],
  );
  await createJoineesForCall(visitId, joinees);
  if (rcpa !== undefined) {
    await createRCPAForCall(visitId, rcpa.currentRCPA);
  }
  await createBrandDetails(visitId, visit[0].customerId, brands);
  await updateInputs(visitId, inputs);

  const drop = crm.drop;
  const engagement = crm.engagement;
  const stages = crm.stages;
  const allProducts = await selectQuery('OwnBrandMaster');
  for (const product of allProducts) {
    const row = [
      generateId(),
      visitId,
      product.id,
      stages[product.id] === undefined ? null : stages[product.id],
      drop[product.id] === undefined ? false : true,
      engagement[product.id] === undefined ? false : true,
    ];
    await upsertQuery('CrmStage', row);
  }
  const latestStages = await selectQuery('CRMLatestStage', [
    visit[0].customerId,
  ]);
  if (latestStages.length === 1) {
    await executeQuery('DELETE from CRMLatestStage where doctorId = ?', [
      visit[0].customerId,
    ]);
  }
  for (const product of allProducts) {
    const row = [
      generateId(),
      visit[0].customerId,
      product.id,
      stages[product.id] === undefined ? null : stages[product.id],
      drop[product.id] === undefined ? false : true,
      false,
    ];
    await upsertQuery('CRMLatestStage', row);
  }

  if (saveCoordinates) {
    await upsertQuery('DoctorCoordinates', [
      generateId(),
      visit[0].customerId,
      coordinates.longitude,
      coordinates.latitude,
      true,
      0,
    ]);
  }
};

const createJoineesForCall = async (visitId, joinees) => {
  await executeQuery(
    "UPDATE VisitJoinees set actionTaken = 'D' where visitId = ?",
    [visitId],
  );
  if (joinees === undefined) {
    return;
  }
  const existingJoineesMap = {};
  (await selectQuery(VISIT_JOINEES, [visitId], 'where visitId=?')).forEach(
    joinee => (existingJoineesMap[joinee.managerId] = joinee),
  );
  joinees.forEach(joinee => {
    if (existingJoineesMap[joinee] === undefined) {
      //add joinee id, attendeeId, joineeId, managerId, actionTaken, visitId
      upsertQuery(VISIT_JOINEES, [
        generateId(),
        null,
        null,
        joinee,
        'A',
        visitId,
      ]);
    } else {
      //update joinee
      const existing = existingJoineesMap[joinee];
      executeQuery('UPDATE VisitJoinees set actionTaken = ? where id = ? ', [
        existing.joineeId === null ? 'A' : 'U',
        existing.id,
      ]);
    }
  });
};

const createRCPAForCall = async (visitId, currentRcpas) => {
  if (currentRcpas === undefined) {
    return;
  }
  const existing = await selectQuery(RCPA_DATA, [visitId], 'WHERE visitId=?');
  let existingMap = {};
  existing.forEach(e => {
    existingMap[e.id] = e;
  });
  for (const rcpa of currentRcpas) {
    if (rcpa.action === 'A' && existingMap[rcpa.id] === undefined) {
      upsertQuery(RCPA_DATA, [
        generateId(),
        visitId,
        rcpa.doctorId,
        rcpa.chemistId,
        toTimeStamp(rcpa.rcpaDate),
        toYyyyMmDd(rcpa.rcpaDate),
        rcpa.ownBrandId,
        rcpa.isOwn,
        rcpa.rxns,
        rcpa.rxnValue,
        rcpa.ownBrandId,
        'A',
        rcpa.compBrandRxns,
        rcpa.compBrandValue,
        rcpa.compBrandQty,
        rcpa.brandQty,
        null,
      ]);
    } else if (rcpa.action === 'D') {
      await executeQuery('UPDATE RCPA_DATA set action = ? where id=?', [
        'D',
        rcpa.id,
      ]);
    }
  }
};

const createBrandDetails = async (visitId, doctorId, detailing) => {
  await executeQuery('UPDATE BrandDetailing set action = ? where visitId=?', [
    'D',
    visitId,
  ]);
  const existingMap = {};
  const existingDetailing = await selectQuery(
    BRAND_DETAILING,
    [visitId],
    'WHERE visitId= ?',
  );
  existingDetailing.forEach(e => (existingMap[e.id] = e));
  let i = 1;
  if (detailing !== undefined) {
    for (const d of detailing) {
      if (existingMap[d.id] === undefined) {
        upsertQuery(BRAND_DETAILING, [
          generateId(),
          d.detailingId,
          visitId,
          doctorId,
          d.id,
          i,
          d.status,
        ]);
      } else {
        upsertQuery(
          BRAND_DETAILING,
          [d.detailingId, visitId, doctorId, d.id, i, 'U', d.id],
          'update',
        );
      }
      i++;
    }
  }
};

const updateInputs = async (visitId, inputs) => {
  const inputsDistributed = await selectQuery(
    INPUT_DISTRIBUTION,
    [visitId],
    ' where visitId = ?',
  );
  let inputMap = {};
  for (const i of inputsDistributed) {
    inputMap[i.inputId] = i;
  }
  if (inputs !== undefined) {
    for (const i of inputs) {
      if (inputMap[i.inputId] === undefined) {
        //id, visitId, inputId, serverId, action, quantity
        await upsertQuery(INPUT_DISTRIBUTION, [
          generateId(),
          visitId,
          i.stockId,
          null,
          'A',
          i.distributed,
        ]);
      } else {
        await executeQuery(
          'UPDATE InputDistribution set quantity = ?, action = ? where inputId = ? and visitId = ?',
          [i.distributed, 'U', i.stockId, visitId],
        );
      }
      await executeQuery(
        'UPDATE InputInventory set distributed = distributed + ?, balance = ? where stockId=?',
        [i.distributed, i.balance, i.stockId],
      );
    }
  }
};
