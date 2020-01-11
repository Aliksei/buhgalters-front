import {extendedFetcher} from "../rest/fetcher";

export const taskService = {
    getTasks,
    putTask,
    postTask,
    deleteTask,
    getTaskById
};

function getTasks(monthId) {
    let query  = monthId === null || monthId === undefined || monthId === -1 ? '' : `?monthId=${monthId}`;
    return extendedFetcher
        .getRequest(`http://localhost:8080/tasks${query}`);
}

function putTask(body) {
    return extendedFetcher
        .putRequest("http://localhost:8080/tasks/" + body.id, body);
}

function postTask(body) {
    return extendedFetcher
        .postRequest("http://localhost:8080/tasks", body);
}

function deleteTask(id) {
    return extendedFetcher
        .deleteRequest("http://localhost:8080/tasks/" + id);
}

function getTaskById(id) {
    return extendedFetcher
        .getRequest("http://localhost:8080/tasks/" + id);
}
