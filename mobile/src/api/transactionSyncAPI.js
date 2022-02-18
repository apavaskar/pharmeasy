import AppConfig from '../configs/AppConfig';
import {ajax} from 'rxjs/ajax';

export const syncVisits = (data, certificate) => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/mobile/sync`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
    body: data,
  });
};

export const syncCRMData = (data, certificate) => {
  console.log(data);
  return ajax({
    url: `${AppConfig.API_BASE_URL}/crm/sync`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
    body: data,
  });
};
