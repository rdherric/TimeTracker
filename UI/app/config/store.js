import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { projectReducer } from '../reducers/projectReducers';
import { taskReducer } from '../reducers/taskReducers';
import { statisticsReducer } from '../reducers/statisticsReducers';
import { getTaskList } from '../actions/task/taskListActions';

// Logger middleware
const loggerMiddleware = createLogger();

// Combine all of the reducers
let rootReducer = combineReducers({
    projects: projectReducer,   
    tasks: taskReducer,
    statistics: statisticsReducer
});

// Top-level data store for TimeTracker
export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

// Method to get the Tasks from the API
store.dispatch(getTaskList());
