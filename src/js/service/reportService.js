import {extendedFetcher} from "../rest/fetcher";
import {API_HOST} from "./actService";

export const reportService = {
    getReports,
    putReport,
    postReport,
    deleteReport,
};

function getReports() {
    return extendedFetcher
        .getRequest(`http://${API_HOST}:8080/reports`);
}

function putReport(body) {
    return extendedFetcher
        .putRequest(`http://${API_HOST}:8080/reports/` + body.id, body);
}

function postReport(body) {
    return extendedFetcher
        .postRequest(`http://${API_HOST}:8080/reports`, body);
}

function deleteReport(body) {
    return extendedFetcher
        .deleteRequest(`http://${API_HOST}:8080/reports/` + body.id);
}
