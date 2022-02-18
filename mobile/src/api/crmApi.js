import {ajax} from 'rxjs/ajax';
import {AppConfig} from '../configs';

export const getAllStages = payload => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/crm/allstages`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: payload.certificate,
    },
  });
};

export const getCRMDashboard = payload => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/crm/dashboard/${payload.yearMonth}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: payload.certificate,
    },
  });
};
