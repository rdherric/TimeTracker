import { httpGet } from '../../lib/webApi';
import { getObject, getObjectSuccess, getObjectError } from '../base/getObjectActions';
import { GET_STATISTICS, GET_STATISTICS_SUCCESS, GET_STATISTICS_ERROR } from './statisticsActionConstants';
import { createStatisticsUrl } from '../../config/apiConfig';

// Get Statistics with Thunk
export function getStatistics(startDate = 0, endDate = 0) {
    // Use the HTTP Get method to get the List
    return httpGet(
        createStatisticsUrl(GET_STATISTICS, startDate, endDate),
        () => getObject(GET_STATISTICS),
        (rtn) => getObjectSuccess(GET_STATISTICS_SUCCESS, rtn),
        (error) => getObjectError(GET_STATISTICS_ERROR, null, error)
    );
}

