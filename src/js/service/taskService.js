import {extendedFetcher} from "../rest/fetcher";
import {API_HOST} from "./actService";

export const taskService = {
    getTasks,
    putTask,
    postTask,
    deleteTask,
    getTaskById
};

function getTasks(monthId, signal) {
    let query  = monthId === null || monthId === undefined || monthId === -1 ? '' : `?monthId=${monthId}`;
    return extendedFetcher
        .getRequest(`http://${API_HOST}:8080/tasks${query}`, signal);
}

function putTask(body, signal) {
    return extendedFetcher
        .putRequest(`http://${API_HOST}:8080/tasks/` + body.id, body, signal);
}

function postTask(body, signal) {
    return extendedFetcher
        .postRequest(`http://${API_HOST}:8080/tasks`, body, signal);
}

function deleteTask(id, signal) {
    return extendedFetcher
        .deleteRequest(`http://${API_HOST}:8080/tasks/` + id, signal);
}

function getTaskById(id, signal) {
    return extendedFetcher
        .getRequest("http://${API_HOST}:8080/tasks/" + id, signal);
}
