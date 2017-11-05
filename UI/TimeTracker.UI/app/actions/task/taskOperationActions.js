import { httpPost, httpPut, httpDelete } from '../../lib/webApi';
import { createTaskUrl } from '../../config/apiConfig';
import { entityOperation, entityOperationSuccess, entityOperationError } from '../base/entityOperationActions';
import { 
    ADD_TASK, ADD_TASK_SUCCESS, ADD_TASK_ERROR, 
    UPDATE_TASK, UPDATE_TASK_SUCCESS, UPDATE_TASK_ERROR,
    DELETE_TASK, DELETE_TASK_SUCCESS, DELETE_TASK_ERROR
} from './taskActionConstants';

// Add new Task with Thunk
export function addTask(task) {
    // Use the HTTP POST method to add the Task
    return httpPost(
        createTaskUrl(ADD_TASK),
        task,
        () => entityOperation(ADD_TASK, project),
        (rtn) => entityOperationSuccess(ADD_TASK_SUCCESS, rtn),
        (error) => entityOperationError(ADD_TASK_ERROR, null, error)
    );
}

// Update existing Task with Thunk
export function updateTask(project) {
    // Use the HTTP PUT method to update the Task
    return httpPut(
        createTaskUrl(UPDATE_TASK, project.id),
        project,
        () => entityOperation(UPDATE_TASK, project),
        (rtn) => entityOperationSuccess(ADD_TASK_SUCCESS, rtn),
        (error) => entityOperationError(ADD_TASK_ERROR, null, error)
    );
}

// Delete existing Task with Thunk
export function deleteTask(project) {
    // Use the HTTP DELETE method to delete the Task
    return httpDelete(
        createTaskUrl(DELETE_TASK, project.id),
        () => entityOperation(DELETE_TASK, project),
        (rtn) => entityOperationSuccess(DELETE_TASK_SUCCESS, rtn),
        (error) => entityOperationError(DELETE_TASK_ERROR, null, error)
    );
}
