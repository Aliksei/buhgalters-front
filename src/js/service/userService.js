import {extendedFetcher} from "../rest/fetcher";
import {API_HOST} from "./actService";

export const userService = {
    createUser,
    getCurrentUser,
};

function getCurrentUser(signal) {
    return extendedFetcher
        .getRequest(`http://${API_HOST}:8080/user`, signal);
}

function getUserTasks(id, signal) {
    return extendedFetcher
        .getRequest(`http://${API_HOST}:8080/user/${id}/tasks`, signal);
}

function createUser(body, signal) {
    const requestOptions = {
        signal,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    };
    return extendedFetcher
        .executeRequestNoHandling(`http://${API_HOST}:8080/user/`, requestOptions);
}
