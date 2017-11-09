import React, { View } from 'react';
import PropTypes from 'prop-types';
import Task from './Task';

// Function to create the TaskList
const TaskList = ({ taskList, onTaskDoubleClick }) => (
    <View>
        {taskList.map((t, index) => (
            <Task key={index} task={t} onDoubleClick={() => onTaskDoubleClick(t)} />
        ))}
    </View>
);

// Setup PropTypes
TaskList.propTypes = {
    taskList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            projectClient: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            startDateTime: PropTypes.number.isRequired,
            endDateTime: PropTypes.number.isRequired
        }).isRequired
    ).isRequired,
    onTaskDoubleClick: PropTypes.func
};

// Export the TaskList function
export default TaskList;