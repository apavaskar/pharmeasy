import {selectQuery} from '../genericDao';
import {APPLICATION_CONFIGS, REPORT_UNLOCK_HISTORY} from '../constants';

export const loadConfigs = async () =>
  await selectQuery(APPLICATION_CONFIGS, []);

export const loadUnlockRequests = async () =>
  await selectQuery(REPORT_UNLOCK_HISTORY, []);
