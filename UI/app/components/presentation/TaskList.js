import React, { Component } from 'react';
import { SectionList, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Task } from './Task';
import { formatToCompleteDateTime, formatToHoursMinutes } from '../../lib/dateFormat';

// TaskList Component
export class TaskList extends Component {

    // Constructor
    constructor(props) {

        // Call the base class
        super(props);

        // Now dispatch a call to the API for the Task list and statistics
        // via the passed methods on Props
        props.dispatchGetTaskList();
    }

    // Render method
    render() {

        // Render the Sections
        let sections = this._buildSections();

        return (
            <SectionList
                keyExtractor={this._extractKey}
                renderItem={this._renderTask}
                renderSectionHeader={this._renderSectionHeader}
                sections={sections}
            />
        );
    }

    // Method to render a Section Header
    _renderSectionHeader = (section) => {

        // Get the DTO locally
        let dailyTask = section.section.dailyTask;

        return (
            <View style={{backgroundColor: 'darkgrey'}}>
                <Text>{formatToCompleteDateTime(dailyTask.date)}</Text>
                <Text>This Day: {formatToHoursMinutes(dailyTask.minutesToday)}</Text>
                <Text>This Week: {formatToHoursMinutes(dailyTask.minutesWeekToDate)}</Text>
                <Text>This Month: {formatToHoursMinutes(dailyTask.minutesMonthToDate)}</Text>
            </View>
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

    // Method to build the set of Sections
    _buildSections = () => {

        // Return the Sections
        let rtn = this.props.taskList
            .map(dt => ({
                key: dt.date,
                data: dt.tasks,
                dailyTask: dt
            }));

        // Return the results
        return rtn;
    }
}

// Setup PropTypes
TaskList.propTypes = {
    taskList: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.number.isRequired,
            tasks: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    projectClient: PropTypes.string.isRequired,
                    description: PropTypes.string.isRequired,
                    startDateTime: PropTypes.number.isRequired,
                    endDateTime: PropTypes.number.isRequired
                }).isRequired
            ).isRequired,
            minutesToday: PropTypes.number.isRequired,
            minutesWeekToDate: PropTypes.number.isRequired,
            minutesMonthToDate: PropTypes.number.isRequired
        }).isRequired
    ).isRequired,
    onTaskEditClick: PropTypes.func.isRequired,
    dispatchGetTaskList: PropTypes.func.isRequired
};
