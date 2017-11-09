import { httpPost, httpPut, httpDelete } from '../../lib/webApi';
import { createProjectUrl } from '../../config/apiConfig';
import { entityOperation, entityOperationSuccess, entityOperationError } from '../base/entityOperationActions';
import { 
    ADD_PROJECT, ADD_PROJECT_SUCCESS, ADD_PROJECT_ERROR, 
    UPDATE_PROJECT, UPDATE_PROJECT_SUCCESS, UPDATE_PROJECT_ERROR,
    DELETE_PROJECT, DELETE_PROJECT_SUCCESS, DELETE_PROJECT_ERROR
} from './projectActionConstants';

// Add new Project with Thunk
export function addProject(project) {
    // Use the HTTP POST method to add the Project
    return httpPost(
        createProjectUrl(ADD_PROJECT),
        project,
        () => entityOperation(ADD_PROJECT, project),
        (rtn) => entityOperationSuccess(ADD_PROJECT_SUCCESS, rtn),
        (error) => entityOperationError(ADD_PROJECT_ERROR, null, error)
    );
}

// Update existing Project with Thunk
export function updateProject(project) {
    // Use the HTTP PUT method to update the Project
    return httpPut(
        createProjectUrl(UPDATE_PROJECT, project.id),
        project,
        () => entityOperation(UPDATE_PROJECT, project),
        (rtn) => entityOperationSuccess(UPDATE_PROJECT_SUCCESS, rtn),
        (error) => entityOperationError(UPDATE_PROJECT_ERROR, null, error)
    );
}

// Delete existing Project with Thunk
export function deleteProject(project) {
    // Use the HTTP DELETE method to delete the Project
    return httpDelete(
        createProjectUrl(DELETE_PROJECT, project.id),
        () => entityOperation(DELETE_PROJECT, project),
        (rtn) => entityOperationSuccess(DELETE_PROJECT_SUCCESS, rtn),
        (error) => entityOperationError(DELETE_PROJECT_ERROR, null, error)
    );
}
