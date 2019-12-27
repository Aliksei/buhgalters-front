export const extendedFetcher = {
    putRequest,
    postRequest,
    getRequest,
    deleteRequest,
};

function putRequest(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization : 'Bearer '  + localStorage.getItem('tokens').replace('"', '').replace('"', '')
        },
        body: JSON.stringify(body)
    };
    return executeRequest(url, requestOptions);
}

function postRequest(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization : 'Bearer '  + localStorage.getItem('tokens').replace('"', '').replace('"', '')
        },
        body: JSON.stringify(body)
    };
    return executeRequest(url, requestOptions);
}

function getRequest(url) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization : 'Bearer '  + localStorage.getItem('tokens').replace('"', '').replace('"', '')
        }
    };
    return executeRequest(url, requestOptions);
}

function deleteRequest(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization : 'Bearer '  + localStorage.getItem('tokens').replace('"', '').replace('"', '')
        }
    };
    return executeRequest(url, requestOptions);
}

function executeRequest(url, requestOptions) {
    return fetch(url, requestOptions)
        .then(handleResponse);
}

function handleResponse(response) {
    return response.text()
        .then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        });
}

