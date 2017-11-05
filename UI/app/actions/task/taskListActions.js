import { httpGet } from '../../lib/webApi';
import { getObject, getObjectSuccess, getObjectError } from '../base/getObjectActions';
import { GET_TASK_LIST, GET_TASK_LIST_SUCCESS, GET_TASK_LIST_ERROR } from './projectActionConstants';
import { createTaskUrl } from '../../config/apiConfig';

// Get Task List with Thunk
export function getTaskList() {
    // Use the HTTP Get method to get the List
    return httpGet(
        createTaskUrl(GET_TASK_LIST),
        () => getObject(GET_TASK_LIST),
        (rtn) => getObjectSuccess(GET_TASK_LIST_SUCCESS, rtn),
        (error) => getObjectError(GET_TASK_LIST_ERROR, null, error)
    );
}

