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

function downlaod(body) {
    return extendedFetcher
        .getRequest("http://localhost:8080/download");
}
