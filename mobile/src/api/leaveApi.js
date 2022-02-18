import {ajax} from 'rxjs/ajax';
import {AppConfig} from '../configs';

export const applyLeaveAPI = (leave, certificate) => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/leaves/createLeave`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
    body: leave,
  });
};

export const fetchLeaveAPI = (employeeId, yyyyMM, certificate) => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/leaves/by-employee/${employeeId}/${yyyyMM}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
  });
};
