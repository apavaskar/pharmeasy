
import { divisionListAPI } from "./apiConstants";
import { createRequest } from "./httpUtils";

export const divisionListRequest = (payload) => {
    return createRequest(divisionListAPI, payload.certificate);
}
