import {extendedFetcher} from "../rest/fetcher";
import {API_HOST} from "./actService";

export const userService = {
    createUser,
};

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
