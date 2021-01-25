import {extendedFetcher} from "../rest/fetcher";

export const API_HOST = process.env.REACT_APP_SPRING_BASE_URL;


export const getActs = async (signal) => {
    return extendedFetcher
        .getRequest(`http://${API_HOST}:8080/acts`, signal);
};

export const deleteAct = async (body, signal) => {
    return extendedFetcher
        .deleteRequest(`http://${API_HOST}:8080/acts/` + body.id, signal);
};

export const downloadAsPdf = async (body, signal) => {
    return extendedFetcher.downloadRequest(`http://${API_HOST}:8080/acts/downloadAsPdf`, body, signal);
};

export const downloadAsWord = (body, signal) => {
    return extendedFetcher.downloadRequest(`http://${API_HOST}:8080/acts/downloadAsWord`, body, signal);
};

export const downlaod = (body, signal) => {
    return extendedFetcher.downloadRequest(`http://${API_HOST}:8080/acts/download`, body, signal);
};