import {extendedFetcher} from "../rest/fetcher";
import {API_HOST} from "./actService";

export const reportService = {
    putReport,
    postReport,
    deleteReport,
};

export const getReports = async (signal) => {
    return await extendedFetcher
        .getRequest(`http://${API_HOST}:8080/reports`, signal);
};

async function putReport(body, signal) {
    return extendedFetcher
        .putRequest(`http://${API_HOST}:8080/reports/` + body.id, body, signal);
}

async function postReport(body, signal) {
    return extendedFetcher
        .postRequest(`http://${API_HOST}:8080/reports`, body, signal);
}

async function deleteReport(body, signal) {
    return extendedFetcher
        .deleteRequest(`http://${API_HOST}:8080/reports/` + body.id, signal);
}
