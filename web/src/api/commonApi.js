import {createRequest} from "./httpUtils";
import {documentById, locationAPI, searchApprovalAPI, systemLovByTypeAPI, townsAPI} from "./apiConstants";

export const systemLovByType = (payload) => {
    const url = `${systemLovByTypeAPI.url}/${payload.type}`;
    const api = {...systemLovByTypeAPI, url: url};
    return createRequest(api, payload.certificate, null)
}

export const downloadDocumentById = (id, certificate) => {
    const url = `${documentById.url}/${id}`;
    const api = {...documentById, url: url};
    return createRequest(api, certificate, null)
}

export const locationRequest = (id, certificate) => {
    const url = `${locationAPI.url}/${id}`;
    const api = {...locationAPI, url: url};
    return createRequest(api, certificate, null)
}

export const townsListRequest = (payload) => {
    const url = `${townsAPI.url}/${payload.locationId}`;
    const api = {...townsAPI, url: url};
    return createRequest(api, payload.certificate, null)
}

export const searchApprovalRequest = (payload) => {
    const url = `${searchApprovalAPI.url}/${payload.employeeId}/${payload.yearMonth}?type=${payload.type || 'all'}`
    return createRequest({...searchApprovalAPI, url: url}, payload.certificate, null)
}

export const townListForChemistRequest = payload => {
    const url = `${townsAPI.url}/${payload.location}?ownerType=che`;
    const api = {...townsAPI, url: url};
    return createRequest(api, payload.certificate, null)
}
