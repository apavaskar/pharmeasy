import {ajax} from 'rxjs/ajax';
import {AppConfig} from '../configs';

export const getDashboardData = (locationId, yearMonth, certificate) => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/mobile/dashboard/${locationId}/${yearMonth}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
  });
};

export const getDailyHospitalVisitsSummary = (
  locationId,
  yearMonth,
  certificate,
  drilldown,
) => {
  let url = '';
  if (drilldown === false) {
    url = `${AppConfig.API_BASE_URL}/hospitaldailyrcpa/dashboard/${locationId}/${yearMonth}`;
  } else {
    url = `${AppConfig.API_BASE_URL}/hospitaldailyrcpa/dashboard-for-hierarchy/${locationId}/${yearMonth}`;
  }

  return ajax({
    url: url,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
  });
};

export const getMonthlyHospitalVisitsSummary = (
  locationId,
  yearMonth,
  certificate,
) => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/hospitalrcpa/visit-report/${locationId}/${yearMonth}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
  });
};

export const getNotifications = certificate => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/notifications/`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
  });
};

export const getMonthlyHospitalSummary = (
  locationId,
  yearMonth,
  certificate,
  drilldown,
) => {
  let url = '';
  if (drilldown === false) {
    url = `${AppConfig.API_BASE_URL}/hospitalrcpa/dashboard/${locationId}/${yearMonth}`;
  } else {
    url = `${AppConfig.API_BASE_URL}/hospitalrcpa/dashboard-for-hierarchy/${locationId}/${yearMonth}`;
  }
  return ajax({
    url: url,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
  });
};
