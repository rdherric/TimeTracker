import PropTypes from 'prop-types';

// PropTypes for a Task object
export const TaskType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    projectClient: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    startDateTime: PropTypes.number.isRequired,
    endDateTime: PropTypes.number.isRequired
});

// PropTypes for a DailyTask object
export const DailyTaskType = PropTypes.shape({
    date: PropTypes.number.isRequired,
    tasks: PropTypes.arrayOf(TaskType).isRequired,
    minutesToday: PropTypes.number.isRequired,
    minutesWeekToDate: PropTypes.number.isRequired,
    minutesMonthToDate: PropTypes.number.isRequired
});