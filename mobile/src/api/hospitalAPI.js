import {ajax} from 'rxjs/ajax';
import {AppConfig} from '../configs';

export const getHospitals = (locationId, yyyyMm, certificate) => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/hospital/by-location-target/${locationId}/${yyyyMm}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
  });
};

export const getMonthlyVisitsForHospital = (
  locationId,
  yyyyMm,
  certificate,
) => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/hospitalrcpa/by-location-month/${locationId}/${yyyyMm}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
  });
};

export const getDailyVisitsForHospital = (locationId, yyyyMm, certificate) => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/hospitaldailyrcpa/by-location-month/${locationId}/${yyyyMm}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: certificate,
    },
  });
};
