import {ajax} from 'rxjs/ajax';
import {AppConfig} from '../configs';

export const loginAPI = (username, password) => {
  return ajax({
    url: `${AppConfig.API_BASE_URL}/auth/login`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      username: username,
      password: password,
    },
  });
};
