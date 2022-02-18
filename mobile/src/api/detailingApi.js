import {ajax} from 'rxjs/ajax';
import {AppConfig} from '../configs';

export const getFileDetails = payload => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/detailingfile/by-file-id/${payload.fileId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AUTH_CERTIFICATE: payload.certificate,
    },
  });
};
