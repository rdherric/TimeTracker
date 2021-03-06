import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { reducer as formReducer } from 'redux-form';

import { projectReducer } from '../reducers/projectReducers';
import { taskReducer } from '../reducers/taskReducers';

// Logger middleware
const loggerMiddleware = createLogger();

// Combine all of the reducers
let rootReducer = combineReducers({
    projects: projectReducer,   
    tasks: taskReducer,
    form: formReducer
});

// Top-level data store for TimeTracker
export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

