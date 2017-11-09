import React, { View, Text } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
 
// Function to create the Task row
const Task = ({ task, onDoubleClick }) => (
    <View style={{ flexDirection: 1}}>
        <Text style={{ flex: 1 }}>{task.id}</Text>
        <Text style={{ flex: 1 }}>{task.projectClient}</Text>
        <Text style={{ flex: 1 }}>{task.description}</Text>
        <Text style={{ flex: 1 }}><Moment unix>{task.startDateTime}</Moment></Text>
        <Text style={{ flex: 1 }}><Moment unix>{task.endDateTime}</Moment></Text>
        <Text style={{ flex: 1 }}><Moment unix format='hh:mm'>{task.endDateTime - task.startDateTime}</Moment></Text>
    </View>
);

// Setup the PropTypes
Task.propTypes = {
    task: PropTypes.object.isRequired,
    onDoubleClick: PropTypes.func
};

// Export the function
export default Task;