import {profileAPI, profileByEmployeeAPI, profileForYearMonthAPI} from "./apiConstants";
import { createRequest } from "./httpUtils";

export const userProfileRequest = (payload) => {
    const url = `${profileAPI.url}/${payload.principal.id}`
    let api = {...profileAPI, url: url};
    return createRequest(api, payload.certificate);
}

export const employeeProfileRequest = (payload) => {
    const url = `${profileByEmployeeAPI.url}/${payload.employeeId}`
    let api = {...profileByEmployeeAPI, url: url};
    return createRequest(api, payload.certificate);
}


export const userProfilesForYearMonthRequest = (payload) => {
    const url = `${profileForYearMonthAPI.url}/${payload.employeeId}/${payload.yearMonth}`
    let api = {...profileAPI, url: url};
    return createRequest(api, payload.certificate);
}
