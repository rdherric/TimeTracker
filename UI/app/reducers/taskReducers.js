import { 
    GET_TASK_LIST, GET_TASK_LIST_SUCCESS, GET_TASK_LIST_ERROR,
    ADD_TASK, ADD_TASK_SUCCESS, ADD_TASK_ERROR,
    UPDATE_TASK, UPDATE_TASK_SUCCESS, UPDATE_TASK_ERROR,
    DELETE_TASK, DELETE_TASK_SUCCESS, DELETE_TASK_ERROR
} from '../actions/task/taskActionConstants';

// Initial state for the Reducers
const initialState = {
    taskList: [],
    taskUi: {}
};

// Reducer for Task data
export function taskReducer(state = initialState, action) {
    return {
        taskList: updateTaskList(state.taskList, action),
        taskUi: updateTaskUi(state.taskUi, action)
    };
}

// Method to update Task List
function updateTaskList(taskList, action) {

    // Switch on the type of Action
    switch (action.type) {

    // Replace the Task List on GET
    case GET_TASK_LIST_SUCCESS:
        return action.rtn;
    
    // Add new Task to List
    case ADD_TASK_SUCCESS:
        return [ action.rtn ].concat(taskList);
    
    // Update the Task in the List
    case UPDATE_TASK_SUCCESS:
        return taskList.map(t => 
            t.id === action.rtn.id
                ? action.rtn
                : t);

    // Delete the Task from the List
    case DELETE_TASK_SUCCESS:
        return taskList.filter(t => t.id !== action.rtn.id);
    
    // Return same state
    default:
        return taskList;
    }
}

// Method to update UI from action
function updateTaskUi(taskUi, action) {

    // Switch on the type of Action
    switch (action.type) {

    // Anything that is Task-related, update UI
    case GET_TASK_LIST:
    case GET_TASK_LIST_SUCCESS:
    case GET_TASK_LIST_ERROR:
    case ADD_TASK:
    case ADD_TASK_SUCCESS:
    case ADD_TASK_ERROR:
    case UPDATE_TASK:
    case UPDATE_TASK_SUCCESS:
    case UPDATE_TASK_ERROR:
    case DELETE_TASK:
    case DELETE_TASK_SUCCESS:
    case DELETE_TASK_ERROR:
        return Object.assign({}, taskUi, action.ui);
    
    // Return same state
    default:
        return taskUi;
    }
}