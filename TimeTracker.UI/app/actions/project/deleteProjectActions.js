// Delete Project Action constants
export const DELETE_PROJECT = "DELETE_PROJECT";
export const DELETE_PROJECT_SUCCESS = "DELETE_PROJECT_SUCCESS";
export const DELETE_PROJECT_ERROR = "DELETE_PROJECT_ERROR";

// Action to delete a Project
export function deleteProject(project) {
    return {
        type: DELETE_PROJECT,
        project
    };
}

// Action to signal successful Project delete
export function deleteProjectSuccess(project) {
    return {
        type: DELETE_PROJECT_SUCCESS,
        project
    }
}

// Action to signal error on Project delete
export function deleteProjectError(error) {
    return {
        type: DELETE_PROJECT_ERROR,
        error
    }
}
