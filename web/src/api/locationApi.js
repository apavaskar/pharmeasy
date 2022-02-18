import { allLocationAPI, locationHeirarchyAPI } from "./apiConstants"
import { createRequest } from "./httpUtils";

export const locationHeirarchyRequest = (payload) => {
    let api = {...locationHeirarchyAPI, url: `${locationHeirarchyAPI.url}/${payload.locationId}`};
    return createRequest(api, payload.certificate);
}

export const allLocationRequest = (payload) => {
    let api = {...allLocationAPI, url: `${allLocationAPI.url}/${payload.locationId}`};
    return createRequest(api, payload.certificate);
}
