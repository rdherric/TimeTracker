// Update Task Action constants
export const UPDATE_TASK = "UPDATE_TASK";
export const UPDATE_TASK_SUCCESS = "UPDATE_TASK_SUCCESS";
export const UPDATE_TASK_ERROR = "UPDATE_TASK_ERROR";

// Action to update a Task
export function updateTask(task) {
    return {
        type: UPDATE_TASK,
        task
    };
}

// Action to signal successful Task update
export function updateTaskSuccess(json) {
    return {
        type: UPDATE_TASK_SUCCESS,
        json
    }
}

// Action to signal error on Task update
export function updateTaskError(error) {
    return {
        type: UPDATE_TASK_ERROR
    }
}
