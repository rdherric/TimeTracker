import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
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
        return (
            <FlatList
                data={this.props.taskList}
                keyExtractor={this._extractKey}
                renderItem={this._renderTask}
            />
        );
    }

    // Method to extract the Key for an Item
    _extractKey = (task, index) => task.id;

    // Method to render a Task
    _renderTask = (task) => {
        return (
            <Task task={task} onEditClick={this.props.onTaskEditClick} />
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
    onTaskEditClick: PropTypes.func.isRequired,
    dispatchGetTaskList: PropTypes.func.isRequired
};
