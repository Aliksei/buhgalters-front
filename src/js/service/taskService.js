import {extendedFetcher} from "../rest/fetcher";

export const taskService = {
    getTasks,
    putTask,
    postTask,
    deleteTask,
    getTaskById
};

function getTasks() {
    return extendedFetcher
        .getRequest("http://localhost:8080/tasks");
}

function putTask(body) {
    return extendedFetcher
        .putRequest("http://localhost:8080/tasks/" + body.id, body);
}

function postTask(body) {
    return extendedFetcher
        .postRequest("http://localhost:8080/tasks", body);
}

function deleteTask(body) {
    return extendedFetcher
        .deleteRequest("http://localhost:8080/tasks/" + body.id);
}

function getTaskById(id) {
    return extendedFetcher
        .getRequest("http://localhost:8080/tasks/" + id);
}