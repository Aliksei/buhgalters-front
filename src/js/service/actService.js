import {extendedFetcher} from "../rest/fetcher";

export const API_HOST = process.env.REACT_APP_SPRING_BASE_URL;
// export const API_HOST = "localhost";

export const actService = {
    getActs,
    putAct,
    postAct,
    deleteAct,
    downlaod
};

function getActs() {
    return extendedFetcher
        .getRequest(`http://${API_HOST}:8080/acts`);
}

function putAct(body) {
    return extendedFetcher
        .putRequest(`http://${API_HOST}:8080/acts/` + body.id, body);
}

function postAct(body) {
    return extendedFetcher
        .postRequest(`http://${API_HOST}:8080/acts`, body);
}

function deleteAct(body) {
    return extendedFetcher
        .deleteRequest(`http://${API_HOST}:8080/acts/` + body.id);
}

async function downlaod(body) {
    return extendedFetcher.downloadRequest(`http://${API_HOST}:8080/acts/download`, body);


    // let s = objectToQueryString(buildedParams);
    // let url = `http://${API_HOST}:8080/acts/download?${s}`;
    // let decoded = decodeURI(url).replace(/\s/g, "%20");
    // console.log(decoded);
    // return extendedFetcher
    //     .downloadRequest(decoded);
}

function objectToQueryString(obj) {
    return Object.keys(obj)
        .map(key => key + '=' + decodeURIComponent(obj[key]))
        .join('&');
}
