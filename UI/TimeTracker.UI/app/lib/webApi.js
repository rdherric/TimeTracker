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

// Private method to generate the URL
function createCompleteUri(uri) {
    // Add the passed parameter to the base
    return ApiUrlBase + uri;
}

// Private method to run the HTTP operations
function performFetch(fetchOperation, requestAction, successAction, errorAction) {

    // Return the new Dispatch
    return dispatch => {

        // Dispatch off the request Action if necessary
        if (requestAction) dispatch(requestAction());
    
        // Set a flag to show an error condition below - this is 
        // necessary because the error closure is used on fetch, 
        // but a .then on the Promise.  The flag can be used in the
        // .then to check for an error.
        let errorOccurred = false;

        // Return the fetch method for the GET with the specified URL
        return fetchOperation()
            .then(
                // Get the Response as JSON
                response => response.json(),

                // If an error occurs, use the error Action if necessary
                error => {
                    
                    // Dispatch the error if necessary
                    if (errorAction) dispatch(errorAction(error)); 

                    // Set the errorOccurred flag 
                    errorOccurred = true;
                }
            )
            .then(
                // Dispatch the results to the success Action if successful
                // and if the action is defined
                json => { if (errorOccurred === false && successAction) dispatch(successAction(json)); }
            );
    }
}