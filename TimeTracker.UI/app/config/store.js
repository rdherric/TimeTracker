// Top-level data store for TimeTracker
var store = {
    // The list of Projects and fetch state
    projects: {
        isFetching: false,
        error: "",
        projectList: []
    },

    // The list of Tasks and fetch state
    tasks: {
        isFetching: false,
        error: "",
        taskList: []
    },

    // The set of Task Statistics and fetch state
    statistics: {
        isFetching: false,
        error: "",
        statistics: []
    }
};