import { dispatch } from 'redux';

// Gets the specified URL
export function httpGet(uri, requestAction, successAction, errorAction) {
    return performFetch(
        () => fetch(uri),
        requestAction,
        successAction,
        errorAction
    );
}

// POSTs to the specified URL
export function httpPost(uri, body, requestAction, successAction, errorAction) {
    return performFetch(
        () => fetch(uri, { method: "POST", body: JSON.stringify(body) }),
        requestAction,
        successAction,
        errorAction
    );
}

// PUTs to the specified URL
export function httpPut(uri, body, requestAction, successAction, errorAction) {
    return performFetch(
        () => fetch(uri, { method: "PUT", body: JSON.stringify(body) }),
        requestAction,
        successAction,
        errorAction
    );
}

// DELETEs to the specified URL
export function httpDelete(uri, requestAction, successAction, errorAction) {
    return performFetch(
        () => fetch(uri, { method: "DELETE" }),
        requestAction,
        successAction,
        errorAction
    );
}

// Private method to run the HTTP operations
function performFetch(fetchOperation, requestAction, successAction, errorAction) {

    // Return the new Dispatch
    return dispatch => {

        // Dispatch off the request Action if necessary
        if (requestAction) dispatch(requestAction());
    
        // Return the fetch method for the GET with the specified URL
        return fetchOperation()
            .then(
                // Get the Response as JSON
                response => response.json(),

                // If an error occurs, use the error Action if necessary
                error => { if (requestAction) dispatch(requestAction(error)); }
            )
            .then(
                // Dispatch the results to the success Action if necessary
                json => { if (successAction) dispatch(successAction(json)); }
            );
    }
}