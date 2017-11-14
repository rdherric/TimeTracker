import moment from 'moment';

// Constant for date format
export const DAY_DATE_FORMAT = 'ddd, MM/DD/YYYY';
export const DATE_FORMAT = 'MM/DD/YYYY HH:mm';
export const DURATION_FORMAT = 'H:mm';

// Setup Moment
moment.locale('en');

// Function to format as complete DateTime
export function formatToCompleteDateTime(dt) {
    return moment(dt).format(DAY_DATE_FORMAT);
}

// Function to format as standard DateTime
export function formatToStandardDateTime(dt) {
    return moment(dt).format(DATE_FORMAT);
}

// Function to format minutes as Hours and Minutes
export function formatMinsToHoursMinutes(dt) {

    // Get the hours and minutes
    let hours = parseInt(dt / 60);
    let minutes = parseInt(dt % 60);

    // Return the formatted string
    return (hours > 0 ? hours : '0') + ':' + (minutes > 0 ? minutes : '00');
}

// Function to format milliseconds as Hours and Minutes
export function formatMsToHoursMinutes(dt) {
    
    // Get the value as minutes
    let mins = dt / 60000;

    // Return the other function
    return formatMinsToHoursMinutes(mins);
}
    