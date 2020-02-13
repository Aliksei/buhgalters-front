import {extendedFetcher} from "../rest/fetcher";
import {API_HOST} from "./actService";

export const employeeService = {
    getAllEmployees,
    getUserById
};

function getAllEmployees() {
    return extendedFetcher
        .getRequest(`http://${API_HOST}:8080/employees`);
}

function getUserById(id) {
    return extendedFetcher
        .getRequest(`http://${API_HOST}:8080/employees/` + id);
}