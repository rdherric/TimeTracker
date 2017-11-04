// Add Task Action constants
export const ADD_TASK = "ADD_TASK";
export const ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS";
export const ADD_TASK_ERROR = "ADD_TASK_ERROR";

// Action to add a Task
export function addTask(task) {
    return {
        type: ADD_TASK,
        task
    };
}

// Action to signal successful Task add
export function addTaskSuccess(json) {
    return {
        type: ADD_TASK_SUCCESS,
        json
    }
}

// Action to signal error on Task add
export function addTaskError(error) {
    return {
        type: ADD_TASK_ERROR
    }
}
