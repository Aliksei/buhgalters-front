import {extendedFetcher} from "../rest/fetcher";
import {API_HOST} from "./actService";

export const userService = {
    createUser,
};

function createUser(body) {
    return extendedFetcher
        .postRequest(`http://${API_HOST}:8080/user/`, body);
}
