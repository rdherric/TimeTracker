import { ADD_PROJECT, ADD_PROJECT_SUCCESS, ADD_PROJECT_ERROR } from '../actions/addProjectActions';

// The initial state for the Project list
const initialState = {
    isFetching: false,
    error: "",
    projectList: []
};

// Reducer for Projects
export function addProjectReducer(state = initialState, action) {
    //Switch on the type of Action
    switch (action.type) {

        // Try to a new Project - show loading
        case ADD_PROJECT:
            return Object.assign({}, state, {
                isFetching: true
            });

        // Project add success - add to list and stop loading
        case ADD_PROJECT_SUCCESS: 
            return Object.assign({}, state, {
                isFetching: false,
                projectList: Array.from(state.projectList).push(action.json)
            });

        // Project add error - set error message and stop loading
        case ADD_PROJECT_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            });

        default:
            //Return the same state
            return state;
    }
}
