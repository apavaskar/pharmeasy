import {executeQuery, selectQuery} from './genericDao';
import {toDbDate, toTimeStamp, toYyyyMmDd} from '../utils/dateUtil';

export const reportNoncallActivity = async activity => {
  await executeQuery(
    'UPDATE TourPlan set visitTime = ? , visitTimeYyyyMmDd=?, ncaDuration =?, synced = 0, visited = 1 where id = ?',
    [
      toDbDate(new Date()),
      toYyyyMmDd(new Date()),
      activity.duration,
      activity.id,
    ],
  );
  return activity;
};
