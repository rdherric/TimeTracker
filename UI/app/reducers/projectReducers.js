import { 
    GET_PROJECT_LIST, GET_PROJECT_LIST_SUCCESS, GET_PROJECT_LIST_ERROR,
    ADD_PROJECT, ADD_PROJECT_SUCCESS, ADD_PROJECT_ERROR,
    UPDATE_PROJECT, UPDATE_PROJECT_SUCCESS, UPDATE_PROJECT_ERROR,
    DELETE_PROJECT, DELETE_PROJECT_SUCCESS, DELETE_PROJECT_ERROR
} from '../actions/project/projectActionConstants';

// Initial state for the Reducers
const initialState = {
    projectList: [],
    projectUi: {}
};

// Reducer for Project data
export function projectReducer(state = initialState, action) {
    return {
        projectList: updateProjectList(state.projectList, action),
        projectUi: updateProjectUi(state.projectUi, action)
    };
}

// Method to update Project List
function updateProjectList(projectList, action) {

    // Switch on the type of Action
    switch (action.type) {

    // Replace the Project List on GET
    case GET_PROJECT_LIST_SUCCESS:
        return action.rtn;
    
    // Add new Project to List
    case ADD_PROJECT_SUCCESS:
        return [ action.rtn ].concat(projectList);
    
    // Update the Project in the List
    case UPDATE_PROJECT_SUCCESS:
        return projectList.map(p => 
            p.id === action.rtn.id
                ? action.rtn
                : p);

    // Delete the Project from the List
    case DELETE_PROJECT_SUCCESS:
        return projectList.filter(p => p.id !== action.rtn.id);
    
    // Return same state
    default:
        return projectList;
    }
}

// Method to update UI from action
function updateProjectUi(projectUi, action) {

    // Switch on the type of Action
    switch (action.type) {

    // Anything that is Project-related, update UI
    case GET_PROJECT_LIST:
    case GET_PROJECT_LIST_SUCCESS:
    case GET_PROJECT_LIST_ERROR:
    case ADD_PROJECT:
    case ADD_PROJECT_SUCCESS:
    case ADD_PROJECT_ERROR:
    case UPDATE_PROJECT:
    case UPDATE_PROJECT_SUCCESS:
    case UPDATE_PROJECT_ERROR:
    case DELETE_PROJECT:
    case DELETE_PROJECT_SUCCESS:
    case DELETE_PROJECT_ERROR:
        return Object.assign({}, projectUi, action.ui);
    
    // Return same state
    default:
        return projectUi;
    }
}