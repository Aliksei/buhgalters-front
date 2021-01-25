import {extendedFetcher} from "../rest/fetcher";
import {API_HOST} from "./actService";

export const companyService = {
    getUsersByCompanyId
};

function getUsersByCompanyId(id, signal) {
    return extendedFetcher
        .getRequest(`http://${API_HOST}:8080/company/` + id + "/users", signal);
}
