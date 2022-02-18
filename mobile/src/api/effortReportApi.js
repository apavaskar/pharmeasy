import {ajax} from 'rxjs/ajax';
import {AppConfig} from '../configs';

export const coverageReportAPI = payload => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/reports/effort/${payload.locationId}/${payload.yearMonth}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: payload.certificate,
    },
  });
};

export const missedCallReportAPI = payload => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/reports/effort/missedcall/${payload.locationId}/${payload.yearMonth}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: payload.certificate,
    },
  });
};
