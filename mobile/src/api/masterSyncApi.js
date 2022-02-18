import AppConfig from '../configs/AppConfig';
import {ajax} from 'rxjs/ajax';
import {toYyyyMm} from '../utils/dateUtil';

export const getUserProfileAPI = (principalId, certificate) => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/employee/profile/${principalId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
  });
};

export const getMyBeats = (locationId, certificate) => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/beat/by-location/${locationId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
  });
};

export const getJoineesAPI = (locationId, certificate) => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/employee/hierarchy/${locationId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
  });
};

export const getMyBrands = (locationId, certificate) => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/brand/rcpa-items/${locationId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
  });
};

export const getMyChemists = (locationId, certificate) => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/chemist/by-location/${locationId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
  });
};

export const getMyDoctors = (locationId, certificate) => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/doctor/by-location/${locationId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
  });
};

export const getLovByType = (type, certificate) => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/systemlov/by-type/${type}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
  });
};

export const getMarketingTemplateAPI = (locationId, certificate) => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/digitalcalltemplate/by-location/${locationId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
  });
};

export const getSystemLov = (type, certificate) => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/systemlov/by-type/${type}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
  });
};

export const getVisitDetails = (employeeId, fromDate, toDate, certificate) => {
  ajax({
    url: `${AppConfig.API_BASE_URL}/dailyvisitattendee/by-employee-period/${employeeId}/employee/${fromDate}/${toDate}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
  });
};

export const getInventoryDetails = (employeeId, certificate) =>
  ajax({
    url: `${AppConfig.API_BASE_URL}/inventorymaster/by-employee/${employeeId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
  });

export const getMyTeam = (locationId, certificate) =>
  getRequest(`employee/my-team/${locationId}`, certificate);

export const getMyTeamPlan = (employeeId, type, certificate) =>
  getRequest(
    `dailyvisitattendee/by-employee-period/${employeeId}/${type}/${toYyyyMm(
      Date(),
    )}/${toYyyyMm(Date())}`,
    certificate,
  );

export const getJointVisits = (employeeId, visitDate, certificate) =>
  getRequest(
    `dailyvisitjoinee/manager-joint-visits/${employeeId}/${toYyyyMm(
      visitDate,
    )}`,
    certificate,
  );

export const getDetailingAids = (certificate) =>
  getRequest(`/detailingfile/for-brand/`, certificate);

export const getDetailingFileDetails = (fileId, certificate) =>
  getRequest(`/detailingfile/by-file-id/${fileId}`, certificate);

const getRequest = (url, certificate) => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/${url}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
  });
};
