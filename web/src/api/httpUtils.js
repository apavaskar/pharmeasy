import { ajax } from 'rxjs/ajax';
import {AUTH_CERTIFICATE, BASE_URL} from "./apiConstants";

export const createRequest = (api, certificate, body) => {
    const isAuth = api.auth;
    let headers = {};
    headers['Content-Type'] = 'application/json';
    if (isAuth) {
        headers[AUTH_CERTIFICATE] = certificate;
    }
    if (api.method === 'POST' || api.method === 'PUT') {
        return ajax({
            url: `${BASE_URL}${api.url}`,
            method: api.method,
            headers: headers,
            body: body
        });
    } else {
        return ajax({
            url: `${BASE_URL}${api.url}`,
            method: api.method,
            headers: headers,
        });
    }

}


