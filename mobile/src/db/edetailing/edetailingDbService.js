import {
  executeQuery,
  selectAdhocQuery,
  selectQuery,
  upsertQuery,
} from '../genericDao';
import {DETAILING_AID, generateId, PRECALL_PLAN} from '../constants';
import base64 from 'react-native-base64';

export const saveFileToDb = async (payload, id) => {
  return await executeQuery(
    'UPDATE DetailingAid set htmlContent=?, thumbnail =? where id =?',
    [payload.htmlFile, payload.thumbnailFile, id],
  );
};

export const loadFilesForPreview = async () => {
  return await selectAdhocQuery(
    'SELECT d.*, b.name from DetailingAid d inner join OwnBrandMaster b on b.id = d.brandId order by brandId',
    [],
  );
};

export const savePreCall = async payload => {
  const visitId = payload.visitId;
  const brands = payload.brands;
  for (const brand of brands) {
    const files = await selectQuery(
      DETAILING_AID,
      [brand],
      ' where brandId = ?',
    );
    let i = 1;
    for (const file of files) {
      //id, visitId, fileId, seq
      await upsertQuery(PRECALL_PLAN, [generateId(), visitId, file.id, i]);
      i++;
    }
  }
};

export const getFilesForDetailing = async brandId => {
  return await selectAdhocQuery(
    "SELECT id, htmlContent, sequence from DetailingAid d where brandId=? and (htmlContent != null or htmlContent!= '') order by sequence",
    [brandId],
  );
};

export const saveDetailingStats = async stats => {
  let i = 1;
  for (const stat in stats) {
    await upsertQuery('DetailingStats', [
      generateId(),
      stats.visitId,
      stats.fileId,
      stats.timeSpent,
      i,
    ]);
    i++;
  }
};
