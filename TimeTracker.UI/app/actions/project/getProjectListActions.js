// Project List Action constants
export const GET_PROJECT_LIST = "GET_PROJECT_LIST";
export const GET_PROJECT_LIST_SUCCESS = "GET_PROJECT_LIST_SUCCESS";
export const GET_PROJECT_LIST_ERROR = "GET_PROJECT_LIST_ERROR";

// Action to get the list of Projects
export function getProjectList() {
    return {
        type: GET_PROJECT_LIST
    };
}

// Action to signal successful Project List get
export function getProjectListSuccess(json) {
    return {
        type: GET_PROJECT_LIST_SUCCESS,
        json
    }
}

// Action to signal error on Project List get
export function getProjectListError(error) {
    return {
        type: GET_PROJECT_LIST_ERROR,
        error
    }
}
