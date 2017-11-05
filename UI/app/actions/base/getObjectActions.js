// Action to get an object from a server
export function getObject(type) {
    return {
        type,
        ui: { 
            inProcess: true 
        }
    };
}

// Action to signal successful Object get
export function getObjectSuccess(type, rtn) {
    return {
        type,
        rtn,
        ui: {
            inProcess: false
        }
    }
}

// Action to signal error on Object get
export function getObjectError(type, rtn, error) {
    return {
        type,
        rtn,
        ui: {
            inProcess: false,
            error
        }
    }
}
