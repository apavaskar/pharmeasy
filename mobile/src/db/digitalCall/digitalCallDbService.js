import {executeQuery, upsertQuery} from '../genericDao';
import {DIGITAL_CALL_DATA, generateId} from '../constants';
import {DIGITAL_CALL} from '../../configs/AppConstants';

export const saveDigitalCallData = async (
  visitId,
  duration,
  templateId,
  visitModeId,
) => {
  //id, digitalVisitId, visitId, duration, action, templateId, visitModeId
  await upsertQuery(DIGITAL_CALL_DATA, [
    generateId(),
    null,
    visitId,
    duration,
    'A',
    templateId,
    visitModeId,
  ]);
  executeQuery(
    'UPDATE TourPlan set synced = 0, visited = 1, visitTypeId =? where visitId=?',
    [DIGITAL_CALL, visitId],
  );
};
