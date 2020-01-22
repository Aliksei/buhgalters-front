import {extendedFetcher} from "../rest/fetcher";

export const actService = {
    getActs,
    putAct,
    postAct,
    deleteAct,
    downlaod
};

function getActs() {
    return extendedFetcher
        .getRequest("http://localhost:8080/acts");
}

function putAct(body) {
    return extendedFetcher
        .putRequest("http://localhost:8080/acts/" + body.id, body);
}

function postAct(body) {
    return extendedFetcher
        .postRequest("http://localhost:8080/acts", body);
}

function deleteAct(body) {
    return extendedFetcher
        .deleteRequest("http://localhost:8080/acts/" + body.id);
}

async function downlaod(buildedParams) {
    let s = objectToQueryString(buildedParams);
    let url = `http://localhost:8080/acts/download?${s}`;
    let decoded = decodeURI(url).replace(/\s/g, "%20");
    console.log(decoded);
    return extendedFetcher
        .downloadRequest(decoded);
}

function objectToQueryString(obj) {
    return Object.keys(obj)
        .map(key => key + '=' + decodeURIComponent(obj[key]))
        .join('&');
}
