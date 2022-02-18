import {createRequest} from "./httpUtils";
import {menuAPI} from "./apiConstants";

export const menuRequest = (payload) => {
    return createRequest(menuAPI, payload.certificate, payload);
}
