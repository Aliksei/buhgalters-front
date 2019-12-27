import {extendedFetcher} from "../rest/fetcher";


export const clientService = {
    getClients,
    putClient,
    postClient,
    deleteClient,
    getClientById
};


function getClients() {
    return extendedFetcher
        .getRequest("http://localhost:8080/clients/getAll");
}

function putClient(body) {
    return extendedFetcher
        .putRequest("http://localhost:8080/clients", body);
}

function postClient(body) {
    return extendedFetcher
        .postRequest("http://localhost:8080/clients", body);
}

function deleteClient(body) {
    return extendedFetcher
        .deleteRequest("http://localhost:8080/clients/", body.id);
}

function getClientById(id) {
    return extendedFetcher
        .getRequest("http://localhost:8080/client/" + id);
}
