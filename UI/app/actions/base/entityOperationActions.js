// Action to perform an operation on an Entity
export function entityOperation(type, entity) {
    return {
        type,
        entity,
        ui: {
            inProcess: true
        }
    };
}

// Action to signal success of an Entity operation
export function entityOperationSuccess(type, rtn) {
    return {
        type,
        rtn,
        ui: {
            inProcess: false
        }
    };
}

// Action to signal error of an Entity operation
export function entityOperationError(type, rtn, error) {
    return {
        type,
        rtn,
        ui: {
            inProcess: false,
            error
        }
    };
}