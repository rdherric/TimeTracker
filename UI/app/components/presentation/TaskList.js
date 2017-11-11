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

        // Save the state
        this.state = {
            taskList: props.taskList,
            onTaskDoubleClick: () => {}
        };
    }

    // Render method
    render() {
        return (
            <View>
                {this.state.taskList.map((t, index) => (
                    <Task key={index} task={t} onDoubleClick={() => this.state.onTaskDoubleClick(t)} />
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
    onTaskDoubleClick: PropTypes.func
};
