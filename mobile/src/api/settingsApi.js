import {AppConfig} from '../configs';
import {ajax} from 'rxjs/ajax';

export const troubleshootAPI = data => {
  return ajax({
    url: `${AppConfig.TROUBLESHOOT_BASE_URL}/upload/file`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  });
};
