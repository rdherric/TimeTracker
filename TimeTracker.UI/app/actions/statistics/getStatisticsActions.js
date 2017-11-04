// Task Statistics Action constants
export const GET_TASK_STATISTICS = "GET_TASK_STATISTICS";
export const GET_TASK_STATISTICS_SUCCESS = "GET_TASK_STATISTICS_SUCCESS";
export const GET_TASK_STATISTICS_ERROR = "GET_TASK_STATISTICS_ERROR";

// Action to get the Task Statistics
export function getTaskStatistics() {
    return {
        type: GET_TASK_STATISTICS
    };
}

// Action to signal successful Task Statistics get
export function getTaskStatisticsSuccess(json) {
    return {
        type: GET_TASK_STATISTICS_SUCCESS,
        json
    }
}

// Action to signal error on Task Statistics get
export function getTaskStatisticsError(error) {
    return {
        type: GET_TASK_STATISTICS_ERROR,
        error
    }
}
