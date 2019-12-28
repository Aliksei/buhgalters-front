import {extendedFetcher} from "../rest/fetcher";

export const reportService = {
    getReports,
    putReport,
    postReport,
    deleteReport,
};

function getReports() {
    return extendedFetcher
        .getRequest("http://localhost:8080/reports");
}

function putReport(body) {
    return extendedFetcher
        .putRequest("http://localhost:8080/reports/" + body.id, body);
}

function postReport(body) {
    return extendedFetcher
        .postRequest("http://localhost:8080/reports", body);
}

function deleteReport(body) {
    return extendedFetcher
        .deleteRequest("http://localhost:8080/reports/" + body.id);
}
