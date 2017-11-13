// Root URL of the API
const ApiUrlBase = 'http://localhost/TimeTracker';

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
    DELETE_TASK: '/task/' + ID_PLACEHOLDER,
    TIME_ZONE_OFFSET_QUERY: 'timeZoneOffset=',
    START_DATE_QUERY: 'startDateTime=',
    END_DATE_QUERY: 'endDateTime='
};

// Task API parser
export function createTaskUrl(type, id) {
    return ApiUrlBase + taskUrls[type].replace(ID_PLACEHOLDER, id);
}


// Tasks API parser
export function createAllTasksUrl(type, startDate, endDate) {

    // Create the base URL
    let rtn = ApiUrlBase + taskUrls[type];

    // Add a QueryString for time zone offset
    rtn = rtn + '?' + taskUrls.TIME_ZONE_OFFSET_QUERY + (new Date().getTimezoneOffset() * -1);

    // Add a QueryString for the start DateTime
    if (startDate > 0) {
        
        rtn = rtn + '&' + taskUrls.START_DATE_QUERY + startDate;
    }
        
    // Add a QueryString for the end DateTime
    if (endDate > 0) {
        
        rtn = rtn + '&' + taskUrls.END_DATE_QUERY + endDate;
    }
        
    // Return the result
    return rtn;
}
