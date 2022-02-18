import moment from 'moment';

export const yyyyMM = date => moment(date).format('yyyyMM');

export const displayMonthYear = date => moment(`${date}01`).format('MMM-yyyy');

export const yyyyMMDd = date => moment(date).format('yyyyMMDD');

export const yyyy = date => moment(date).format('yyyy');

export const dateForServer = date => moment(date).format('yyyy-MM-DD');

export const displayDate = date => moment(date).format('DD-MMM-yyyy');

export const parseToDate = strDate => moment(strDate, 'yyyy-MM-DD').toDate();

export const displayDateFromServer = serverDate =>
  displayDate(parseToDate(serverDate));

export const displayDateFromYyyyMmDd = yyyyMMDd => moment(moment(`${yyyyMMDd}`, 'YYYYMMDD').toDate()).format('ddd D-MMM');

export const yyyyMmFromServer = serverDate =>
  moment(parseToDate(serverDate)).format('yyyyMM');

export const yyyyMmDdFromServer = serverDate =>
  moment(parseToDate(serverDate)).format('yyyyMMDD');

export const toDate = yyyyMMDD => moment(`${yyyyMMDD}`, 'YYYYMMDD').toDate()
