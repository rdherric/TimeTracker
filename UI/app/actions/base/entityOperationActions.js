import { STATUS_PROCESSING_BEGIN, STATUS_PROCESSING_END } from './statusConstants';

// Action to perform an operation on an Entity
export function entityOperation(type, entity) {
    return {
        type,
        entity,
        ui: {
            status: STATUS_PROCESSING_BEGIN
        }
    };
}

// Action to signal success of an Entity operation
export function entityOperationSuccess(type, rtn) {
    return {
        type,
        rtn,
        ui: {
            status: STATUS_PROCESSING_END
        }
    };
}

// Action to signal error of an Entity operation
export function entityOperationError(type, rtn, error) {
    return {
        type,
        rtn,
        ui: {
            status: STATUS_PROCESSING_END,
            error
        }
    };
}