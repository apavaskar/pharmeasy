import {selectQuery} from './genericDao';
import {JOINEE_MASTER, VISIT_JOINEES} from './constants';

export const loadAllJoinees = async () => {
  return await selectQuery(JOINEE_MASTER, []);
};
