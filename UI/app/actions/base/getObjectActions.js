import { STATUS_PROCESSING_BEGIN, STATUS_PROCESSING_END } from './statusConstants';

// Action to get an object from a server
export function getObject(type) {
    return {
        type,
        ui: { 
            status: STATUS_PROCESSING_BEGIN
        }
    };
}

// Action to signal successful Object get
export function getObjectSuccess(type, rtn) {
    return {
        type,
        rtn,
        ui: {
            status: STATUS_PROCESSING_BEGIN
        }
    };
}

// Action to signal error on Object get
export function getObjectError(type, rtn, error) {
    return {
        type,
        rtn,
        ui: {
            status: STATUS_PROCESSING_BEGIN,
            error
        }
    };
}
