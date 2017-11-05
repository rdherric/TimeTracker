import { 
    GET_STATISTICS, GET_STATISTICS_SUCCESS, GET_STATISTICS_ERROR
 } from '../actions/statistics/statisticsActionConstants';

// Reducer for Statistics data
export function statisticsReducer(state = {}, action) {
    return {
        statistics: updateStatistics(state.statistics, action),
        statisticsUi: updateStatisticsUi(state.statisticsUi, action)
    };
}

// Method to update Statistics
function updateStatistics(statistics, action) {

    // Switch on the type of Action
    switch (action.type) {

        // Replace the Statistics on GET
        case GET_STATISTICS_SUCCESS:
            return action.rtn;
        
        // Return same state
        default:
            return statistics;
    }
}

// Method to update UI from action
function updateStatisticsUi(statisticsUi, action) {

    // Switch on the type of Action
    switch (action.type) {

        // Anything that is Statistics-related, update UI
        case GET_STATISTICS:
        case GET_STATISTICS_SUCCESS:
        case GET_STATISTICS_ERROR:
            return Object.assign({}, statisticsUi, action.ui);
        
        // Return same state
        default:
            return statisticsUi;
    }
}