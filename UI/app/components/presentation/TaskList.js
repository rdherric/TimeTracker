import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Task } from './Task';

// TaskList Component
export class TaskList extends Component {

    // Constructor
    constructor(props) {

        // Call the base class
        super(props);

        // Now dispatch a call to the API for the Task list via the passed method
        // on Props
        props.dispatchGetTaskList();
    }

    // Render method
    render() {

        // Temp storage for the Task List
        let localTaskList = this.props.taskList;

        return (
            <View>
                {localTaskList.map((t, index) => (
                    <Task key={index} task={t} onDoubleClick={() => this.props.onTaskDoubleClick(t)} />
                ))}
            </View>
        );        
    }
}

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
    onTaskDoubleClick: PropTypes.func,
    dispatchGetTaskList: PropTypes.func.isRequired
};
