import {extendedFetcher} from "../rest/fetcher";
import {API_HOST} from "./actService";

export const userService = {
    createUser,
    getCurrentUser,
};

function getCurrentUser() {
    return extendedFetcher
        .getRequest(`http://${API_HOST}:8080/user`);
}

function getUserTasks(id) {
    return extendedFetcher
        .getRequest(`http://${API_HOST}:8080/user/${id}/tasks`);
}

function createUser(body) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    };
    return extendedFetcher
        .executeRequestNoHandling(`http://${API_HOST}:8080/user/`, requestOptions);
}
