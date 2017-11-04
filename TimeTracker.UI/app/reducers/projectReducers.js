import { 
    GET_PROJECT_LIST, GET_PROJECT_LIST_SUCCESS, GET_PROJECT_LIST_ERROR,
    ADD_PROJECT, ADD_PROJECT_SUCCESS, ADD_PROJECT_ERROR,
    UPDATE_PROJECT, UPDATE_PROJECT_SUCCESS, UPDATE_PROJECT_ERROR,
    DELETE_PROJECT, DELETE_PROJECT_SUCCESS, DELETE_PROJECT_ERROR
 } from '../../actions/project/projectActionConstants';

// Reducer for Project data
export function projectReducer(state = {}, action) {
    return {
        updateProjectList: updateProjectList(state.projectList, action),
        updateUi: updateUi(state, action.ui)
    };
}

// Method to update Project List
function updateProjectList(list, action) {

    // Create an Array if necessary
    let newList = (list ? list : []);

    // Switch on the type of Action
    switch (action.type) {

        // Replace the Project List on GET
        case GET_PROJECT_LIST_SUCCESS:
            return action.rtn;
        
        // Add new Project to List
        case ADD_PROJECT_SUCCESS:
            return list.concat([ action.rtn ]);
        
        // Update the Project in the List
        case UPDATE_PROJECT_SUCCESS:
            return list.map(p => 
                p.id === action.rtn.id
                    ? action.rtn
                    : p);

        // Delete the Project from the List
        case DELETE_PROJECT_SUCCESS:
            return list.filter(p => p.id !== action.rtn.id);
        
        // Return same state
        default:
            return list;
    }
}

// Method to update UI from action
function updateUi(state, ui) {
    return Object.assign({}, state, ui);
}