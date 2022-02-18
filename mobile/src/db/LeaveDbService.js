import {selectQuery, upsertQuery} from './genericDao';
import {
  generateId,
  LEAVE_DETAILS,
  LEAVE_HISTORY,
  NAME_VALUE,
} from './constants';
import {
  addDays,
  toDbDate,
  toDbDateFromYyyyMmDd, toYyyyMm,
  toYyyyMmDd,
} from "../utils/dateUtil";

export const loadLeaveTypes = async () => {
  return await selectQuery(NAME_VALUE, ['LEAVE_TYPE'], 'where type = ?');
};

export const saveLeavesToDb = async response => {
  const leave = response.response;
  await upsertQuery(LEAVE_HISTORY, [
    leave.id.id,
    toDbDateFromYyyyMmDd(leave.fromDate),
    toDbDateFromYyyyMmDd(leave.toDate),
    `${(leave.fromDate + '').substring(0, 6)}`,
    leave.fromDate,
    `${(leave.toDate + '').substring(0, 6)}`,
    leave.toDate,
    leave.status.id,
  ]);
  let date = Date(toDbDateFromYyyyMmDd(leave.fromDate));
  const toDate = Date(toDbDateFromYyyyMmDd(leave.toDate));
  while (toYyyyMmDd(date) <= leave.toDate) {
    await upsertQuery(LEAVE_DETAILS, [
      generateId(),
      leave.id.id,
      toDbDate(date),
      toYyyyMmDd(date),
      toYyyyMm(date),
    ]);
    date = addDays(date, 1);
  }
};
