import {selectAdhocQuery, selectQuery} from '../genericDao';
import {VISIT_JOINEES} from '../constants';
import {toYyyyMmDd} from '../../utils/dateUtil';

export const loadJoineesForVisit = async visitId => {
  return await selectQuery(
    VISIT_JOINEES,
    [visitId, 'D'],
    'WHERE visitId=? and actionTaken != ? ',
  );
};

export const markVisit = async visit => {
  console.log(visit);
};

export const loadCallVisits = async () => {
  const plans = await selectAdhocQuery(
    'SELECT * from TourPlan inner join DoctorMaster on TourPlan.customerId = DoctorMaster.id where planDateYyyyMmDd = ?',
    [toYyyyMmDd(Date())],
  );
  return plans;
};
