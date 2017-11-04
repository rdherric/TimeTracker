// Delete Task Action constants
export const DELETE_TASK = "DELETE_TASK";
export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";
export const DELETE_TASK_ERROR = "DELETE_TASK_ERROR";

// Action to delete a Task
export function deleteTask(task) {
    return {
        type: DELETE_TASK,
        task
    };
}

// Action to signal successful Task delete
export function deleteTaskSuccess(task) {
    return {
        type: DELETE_TASK_SUCCESS,
        task
    }
}

// Action to signal error on Task delete
export function deleteTaskError(error) {
    return {
        type: DELETE_TASK_ERROR,
        error
    }
}
