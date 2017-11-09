import Moment from 'react-moment';

// Constant for date format
export const DATE_FORMAT = 'mm/dd/yyyy hh:mm';

// Set the format on Moment globally
Moment.globalLocale = 'en';
Moment.globalFormat = DATE_FORMAT;