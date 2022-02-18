import moment from 'moment';
moment.suppressDeprecationWarnings = true;

export const toYyyyMmDd = mom => parseInt(moment(mom).format('yyyyMMDD'));

export const toDd = mom => parseInt(moment(mom).format('DD'));

export const toYyyyMm = mom => parseInt(moment(mom).format('yyyyMM'));

export const toDbDate = mom => moment(mom).format('yyyy-MM-DD');

export const toTimeStamp = mom => moment(mom).format('MM/DD/YYYY hh:mm a');

export const toDisplayDate = mom => moment(mom).format('DD-MMM-yyyy');

export const toShortDisplayDate = yyyyMmDd =>
  `${(yyyyMmDd + '').substring(6)}-${(yyyyMmDd + '').substring(4, 6)}`;

export const toDisplayDateFromYyyyMmDd = yyyyMmDd =>
  yyyyMmDd === null
    ? ''
    : `${(yyyyMmDd + '').substring(6)}/${(yyyyMmDd + '').substring(4, 6)}/${(
        yyyyMmDd + ''
      ).substring(0, 4)}`;

export const toDateFromTimeStamp = mom =>
  moment(mom).format('DD-MMM-YYYY hh:mm a');

export const toDbDateFromYyyyMmDd = YyyyMmDd =>
  `${(YyyyMmDd + '').substring(0, 4)}-${(YyyyMmDd + '').substring(4, 6)}-${(
    YyyyMmDd + ''
  ).substring(6)}`;

export const addDays = (date, days) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
