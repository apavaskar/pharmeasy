import {selectQuery} from '../genericDao';

export const loadAllStages = async () => {
  return await selectQuery(
    'ProductStages',
    [],
    ' order by product_id, display_sequence',
  );
};

export const loadSavedStages = async doctorId => {
  return await selectQuery('CRMLatestStage', [doctorId], ' where doctorId = ?');
};
