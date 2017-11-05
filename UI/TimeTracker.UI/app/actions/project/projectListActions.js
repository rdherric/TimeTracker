import { httpGet } from '../../lib/webApi';
import { getObject, getObjectSuccess, getObjectError } from '../base/getObjectActions';
import { GET_PROJECT_LIST, GET_PROJECT_LIST_SUCCESS, GET_PROJECT_LIST_ERROR } from './projectActionConstants';
import { createProjectUrl } from '../../config/apiConfig';

// Get Project List with Thunk
export function getProjectList() {
    // Use the HTTP Get method to get the List
    return httpGet(
        createProjectUrl(GET_PROJECT_LIST),
        () => getObject(GET_PROJECT_LIST),
        (rtn) => getObjectSuccess(GET_PROJECT_LIST_SUCCESS, rtn),
        (error) => getObjectError(GET_PROJECT_LIST_ERROR, null, error)
    );
}

