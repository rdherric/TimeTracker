// Update Project Action constants
export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const UPDATE_PROJECT_SUCCESS = "UPDATE_PROJECT_SUCCESS";
export const UPDATE_PROJECT_ERROR = "UPDATE_PROJECT_ERROR";

// Action to update a Project
export function updateProject(project) {
    return {
        type: UPDATE_PROJECT,
        project
    };
}

// Action to signal successful Project update
export function updateProjectSuccess(json) {
    return {
        type: UPDATE_PROJECT_SUCCESS,
        json
    }
}

// Action to signal error on Project update
export function updateProjectError(error) {
    return {
        type: UPDATE_PROJECT_ERROR,
        error
    }
}
