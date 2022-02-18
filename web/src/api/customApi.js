import { createRequest } from "./httpUtils";
import {sfcCreateDistanceAPI, sfcSearchAPI, sfcUpdateDistanceAPI} from "./customApiConstants";

export const sfcSearchRequest = (payload) => {
    const url = `${sfcSearchAPI.url}/${payload.location}`;
    const api = {...sfcSearchAPI, url: url};
    return createRequest(api, payload.certificate, null);
}

export const sfcUpdateDistanceRequest = (payload) => {
    const url = `${sfcUpdateDistanceAPI.url}/${payload.id}/${payload.distance}`;
    const api = {...sfcUpdateDistanceAPI, url: url};
    return createRequest(api, payload.certificate, null);
}

export const sfcCreateDistanceRequest = (payload) => {
    return createRequest(sfcCreateDistanceAPI, payload.certificate, payload.sfc);
}
