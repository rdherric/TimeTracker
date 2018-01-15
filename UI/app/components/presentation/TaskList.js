import React, { Component } from 'react';
import { SectionList, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { STATUS_NEVER_PROCESSED } from '../../actions/base/statusConstants';
import { StatusType } from '../../config/statusPropTypes';
import { DailyTaskType } from '../../config/taskPropTypes';
import TaskDisplay from './TaskDisplay';
import { formatToCompleteDateTime, formatMinsToHoursMinutes } from '../../lib/dateFormat';

// TaskList Component
const TaskList = (props) => {

    // If the TaskList has never been retrieved before, do it now
    if (props.taskUi.status === STATUS_NEVER_PROCESSED) {
        props.dispatchGetTaskList();
    }

    // Render the Sections
    let sections = _buildSections(props);

    return (
        <SectionList
            keyExtractor={_extractKey}
            renderItem={_renderTask}
            renderSectionHeader={_renderSectionHeader}
            sections={sections}
        />
    );
};

// Method to render a Section Header
const _renderSectionHeader = (section) => {

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
};

// Method to extract the Key for an Item
const _extractKey = (task, index) => {
    return task.id;
};

// Method to render a Task
const _renderTask = (sectionTask) => {
    return (
        <TaskDisplay task={sectionTask.item} onEditClick={sectionTask.section.onTaskEditClick} />
    );
};

// Method to build the set of Sections
const _buildSections = (props) => {

    // Return the Sections
    let rtn = props.taskList
        .map(dt => ({
            key: dt.date,
            data: dt.tasks,
            dailyTask: dt,
            onTaskEditClick: props.onTaskEditClick
        }));

    // Return the results
    return rtn;
};

// Setup PropTypes
TaskList.propTypes = {
    taskList: PropTypes.arrayOf(DailyTaskType).isRequired,
    taskUi: StatusType,
    onTaskEditClick: PropTypes.func.isRequired,
    dispatchGetTaskList: PropTypes.func.isRequired
};

// Export TaskList
export default TaskList;