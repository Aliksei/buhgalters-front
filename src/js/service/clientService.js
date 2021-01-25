import {extendedFetcher} from "../rest/fetcher";
import {API_HOST} from "./actService";

export const getClients = async (signal) => {
    return extendedFetcher
        .getRequest(`http://${API_HOST}:8080/clients`, signal);
};

export const putClient = async (body, signal) => {
    return extendedFetcher
        .putRequest(`http://${API_HOST}:8080/clients/` + body.id, body, signal);
};

export const postClient = async (body, signal) => {
    return extendedFetcher
        .postRequest(`http://${API_HOST}:8080/clients`, body, signal);
};

export const deleteClient = async (body, signal) => {
    return extendedFetcher
        .deleteRequest(`http://${API_HOST}:8080/clients/` + body.id, signal);
};

export const getClientById = async (id, signal) => {
    return extendedFetcher
        .getRequest(`http://${API_HOST}:8080/clients/` + id, signal);
};

export const getClientActs = async (id, signal) => {
    return extendedFetcher
        .getRequest(`http://${API_HOST}:8080/clients/` + id + "/acts", signal);
};

export const getClientReports = async (id, signal) => {
    return extendedFetcher
        .getRequest(`http://${API_HOST}:8080/clients/` + id + "/reports", signal);
};

export const postAct = async (body, clientId, signal) => {
    return extendedFetcher
        .postRequest(`http://${API_HOST}:8080/clients/` + clientId + `/acts`, body, signal);
};

export const putAct = async (body, clientId, signal) => {
    return extendedFetcher
        .putRequest(`http://${API_HOST}:8080/clients/` + clientId + `/acts/` + body.id, body, signal);
};

export const sendEmail = async (body, signal) => {
    return extendedFetcher.postRequest(`http://${API_HOST}:8080/sendEmail`, body)
};
