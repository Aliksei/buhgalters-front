export const extendedFetcher = {
    putRequest,
    postRequest,
    getRequest,
    deleteRequest,
    downloadRequest,
    executeRequest,
    executeRequestNoHandling
};

function putRequest(url, body, signal) {
    const requestOptions = {
        signal,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('tokens').replace('"', '').replace('"', '')
        },
        body: JSON.stringify(body)
    };
    return executeRequest(url, requestOptions);
}

function postRequest(url, body, signal) {
    const requestOptions = {
        signal,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('tokens').replace('"', '').replace('"', '')
        },
        body: JSON.stringify(body)
    };
    return executeRequest(url, requestOptions);
}

function getRequest(url, signal) {
    const requestOptions = {
        signal,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('tokens').replace('"', '').replace('"', '')
        }
    };
    return executeRequest(url, requestOptions);
}

function downloadRequest(url, body, signal) {
    const requestOptions = {
        signal,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/pdf',
            Authorization: 'Bearer ' + localStorage.getItem('tokens').replace('"', '').replace('"', '')
        },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions)
        .then(res => res.blob())
        .then(blob => {
            let b = new Blob([blob], {type: "application/pdf"});
            return URL.createObjectURL(b);
        });
}

function deleteRequest(url, signal) {
    const requestOptions = {
        signal,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('tokens').replace('"', '').replace('"', '')
        }
    };
    return executeRequest(url, requestOptions);
}

function executeRequest(url, requestOptions) {
    return fetch(url, requestOptions)
        .then(handleResponse);
}

function executeRequestNoHandling(url, requestOptions) {
    return fetch(url, requestOptions);
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

