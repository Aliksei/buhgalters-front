import {extendedFetcher} from "../rest/fetcher";

export const employeeService = {
    getAllEmployees,
    getUserById
};

function getAllEmployees() {
    return extendedFetcher
        .getRequest("http://localhost:8080/employees");
}

function getUserById(id) {
    return extendedFetcher
        .getRequest("http://localhost:8080/employees/" + id);
}