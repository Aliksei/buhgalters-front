import {extendedFetcher} from "../rest/fetcher";

export const companyService = {
    getUsersByCompanyId
};

function getUsersByCompanyId(id) {
    return extendedFetcher
        .getRequest("http://localhost:8080/company/" + id + "/users");
}
