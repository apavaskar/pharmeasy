import {ajax} from 'rxjs/ajax';
import {AppConfig} from '../configs';

export const addDoctor = (data, certificate) => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/doctor/create`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
    body: data,
  });
};
