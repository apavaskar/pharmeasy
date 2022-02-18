import { loginAPI } from "./apiConstants";
import { createRequest } from "./httpUtils";

export const loginRequest = (payload) => {
    return createRequest(loginAPI, null, payload);
}
