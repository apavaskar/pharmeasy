import {dailyEffortReportAPI, deviationReportAPI, dmlReportAPI, doctorVisitReportAPI, effortReportAPI, expenseConsolidatedAPI, fieldStructureAPI} from "./apiConstants";
import {createRequest} from "./httpUtils";

export const fieldStructureRequest = payload => {
    const api = {...fieldStructureAPI, url: `${fieldStructureAPI.url}/${payload.division.id}`};
    return createRequest(api, payload.certificate);
}

export const effortRequest = payload => {
    const api = {
        ...effortReportAPI, url: `${effortReportAPI.url}/${payload.divisionId}/${payload.yearMonth}`
    }
    return createRequest(api, payload.certificate);
}

export const dmlReportRequest = payload => {
    const api = {
        ...dmlReportAPI, url: `${dmlReportAPI.url}/${payload.divisionId}`
    }
    return createRequest(api, payload.certificate);
}

export const dailyEffortRequest = payload => {
    const api = {
        ...dailyEffortReportAPI, url: `${dailyEffortReportAPI.url}/${payload.location}/${payload.yearMonth}`
    }
    return createRequest(api, payload.certificate);
}

export const doctorVisitRequest = payload => {
    const api = {
        ...doctorVisitReportAPI, url: `${doctorVisitReportAPI.url}/${payload.location}/${payload.yearMonth}`
    }
    return createRequest(api, payload.certificate);
}

export const expenseConsolidatedRequest = payload => {
    const api = {
        ...expenseConsolidatedAPI, url: `${expenseConsolidatedAPI.url}/${payload.divisionId}/${payload.yearMonth}`
    }
    return createRequest(api, payload.certificate);
}

export const deviationVisitRequest = payload => {
    const api = {
        ...deviationReportAPI, url: `${deviationReportAPI.url}/${payload.location}/${payload.yearMonth}`
    }
    return createRequest(api, payload.certificate);
}
