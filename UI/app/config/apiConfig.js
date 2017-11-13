// Root URL of the API
const ApiUrlBase = 'http://localhost:58799';

// Placeholder for IDs
const ID_PLACEHOLDER = '##ID##';

// Project API URLs
const projectUrls = {
    GET_PROJECT_LIST: '/project/all',
    ADD_PROJECT: '/project',
    UPDATE_PROJECT: '/project/' + ID_PLACEHOLDER,
    DELETE_PROJECT: '/project/' + ID_PLACEHOLDER
};

// Project API parser
export function createProjectUrl(type, id) {
    return ApiUrlBase + projectUrls[type].replace(ID_PLACEHOLDER, id);
}


// Task API URLs
const taskUrls = {
    GET_TASK_LIST: '/task/all',
    ADD_TASK: '/task',
    UPDATE_TASK: '/task/' + ID_PLACEHOLDER,
    DELETE_TASK: '/task/' + ID_PLACEHOLDER
};

// Task API parser
export function createTaskUrl(type, id) {
    return ApiUrlBase + taskUrls[type].replace(ID_PLACEHOLDER, id);
}


// Tasks API parser
// export function createTasksUrl(type, startDate, endDate) {

//     // Create the base URL
//     let rtn = ApiUrlBase + statisticsUrls[type];

//     // Add QueryStrings for start or end
//     if (startDate > 0 || endDate > 0) {

//         // Add the Query marker
//         rtn = rtn + '?';

//         // Add the startDate if necessary
//         if (startDate > 0) {
//             rtn = rtn + statisticsUrls.START_DATE_QUERY + startDate;
//         }

//         // Add an Ampersand if necessary
//         if (startDate > 0 && endDate > 0) {
//             rtn = rtn + '&';
//         }

//         // Add the endDate if necessary
//         if (endDate > 0) {
//             rtn = rtn + statisticsUrls.END_DATE_QUERY + endDate;
//         }
//     }

//     // Return the result
//     return rtn;
// }
