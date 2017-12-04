import React, { Component } from 'react';
import { SectionList, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { TaskDisplay } from './TaskDisplay';
import { DailyTaskType } from '../../config/taskPropTypes';
import { formatToCompleteDateTime, formatMinsToHoursMinutes } from '../../lib/dateFormat';

// TaskList Component
export class TaskList extends Component {

    // Constructor
    constructor(props) {

        // Call the base class
        super(props);

        // Now dispatch a call to the API for the Task list and statistics
        // data via the passed method on Props
        props.dispatchGetTaskList();
    }

    // Render method
    render() {
        
        // Render the Sections
        let sections = this._buildSections(this.props);

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
                <Text>This Day: {formatMinsToHoursMinutes(dailyTask.minutesToday)}</Text>
                <Text>This Week: {formatMinsToHoursMinutes(dailyTask.minutesWeekToDate)}</Text>
                <Text>This Month: {formatMinsToHoursMinutes(dailyTask.minutesMonthToDate)}</Text>
            </View>
        );
    }

    // Method to extract the Key for an Item
    _extractKey = (task, index) => {
        return task.id;
    }

    // Method to render a Task
    _renderTask = (sectionTask) => {
        return (
            <TaskDisplay task={sectionTask.item} onEditClick={this.props.onTaskEditClick} />
        );
    }

    // Method to build the set of Sections
    _buildSections = (props) => {

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
    taskList: PropTypes.arrayOf(DailyTaskType).isRequired,
    onTaskEditClick: PropTypes.func.isRequired,
    dispatchGetTaskList: PropTypes.func.isRequired
};
