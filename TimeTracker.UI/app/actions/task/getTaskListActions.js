// Task List Action constants
export const GET_TASK_LIST = "GET_TASK_LIST";
export const GET_TASK_LIST_SUCCESS = "GET_TASK_LIST_SUCCESS";
export const GET_TASK_LIST_ERROR = "GET_TASK_LIST_ERROR";

// Action to get the list of Tasks
export function getTaskList() {
    return {
        type: GET_TASK_LIST
    };
}

// Action to signal successful Task List get
export function getTaskListSuccess(json) {
    return {
        type: GET_TASK_LIST_SUCCESS,
        json
    }
}

// Action to signal error on Task List get
export function getTaskListError(error) {
    return {
        type: GET_TASK_LIST_ERROR,
        error
    }
}
