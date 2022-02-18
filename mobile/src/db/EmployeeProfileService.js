import {selectQuery} from './genericDao';

export const getMyProfile = async () => {
  const profiles = await selectQuery('EmployeeProfile', []);
  return profiles[0];
};
