import {ajax} from 'rxjs/ajax';
import {AppConfig} from '../configs';

export const getPatientForApprovalAPI = (locationId, certificate) => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/hospitalrcpa/approval-list/${locationId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
  });
};

export const getApprovalList = payload => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/approvals/${payload.employeeId}?status=SUBMITTED`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: payload.certificate,
    },
  });
};

export const approveUnlockRequest = payload => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/report-unlock/${payload.action}/${payload.id}/${payload.instanceId}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: payload.certificate,
    },
  });
};

export const approvePatientRCPA = (id, certificate, action) => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/hospitalrcpa/${action}/${id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
  });
};
