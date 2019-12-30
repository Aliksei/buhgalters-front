import {extendedFetcher} from "../rest/fetcher";

export const companyService = {
    getUserByCompanyId,
};

function getUserByCompanyId(id) {
    return extendedFetcher
        .getRequest("http://localhost:8080/company/" + id + "/users");
}
