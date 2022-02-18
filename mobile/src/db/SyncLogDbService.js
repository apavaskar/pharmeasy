import {executeQuery, upsertQuery} from './genericDao';
import {generateId} from './constants';

export const cleanUpLogs = async () => {
  console.log('------------',);
  const minDate = new Date().getTime() - 86400000;
  await executeQuery('DELETE from SyncLog where timeCreated = ?', [minDate]);
};

export const insertIntoSyncLog = async (syncId, type, objectName, count) => {
  await upsertQuery('SyncLog', [
    generateId(),
    type,
    objectName,
    count,
    new Date().getTime(),
    syncId,
  ]);
};
