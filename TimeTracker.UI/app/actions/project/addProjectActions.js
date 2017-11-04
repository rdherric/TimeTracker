// Add Project Action constants
export const ADD_PROJECT = "ADD_PROJECT";
export const ADD_PROJECT_SUCCESS = "ADD_PROJECT_SUCCESS";
export const ADD_PROJECT_ERROR = "ADD_PROJECT_ERROR";

// Action to add a Project
export function addProject(project) {
    return {
        type: ADD_PROJECT,
        project
    };
}

// Action to signal successful Project add
export function addProjectSuccess(json) {
    return {
        type: ADD_PROJECT_SUCCESS,
        json
    }
}

// Action to signal error on Project add
export function addProjectError(error) {
    return {
        type: ADD_PROJECT_ERROR,
        error
    }
}
