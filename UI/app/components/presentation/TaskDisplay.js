import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { TaskType } from '../../config/taskPropTypes';
import { formatToStandardDateTime, formatMsToHoursMinutes } from '../../lib/dateFormat';
 
// TaskDisplay class
const TaskDisplay = (props) => {

    // Local storage for the Task
    let localTask = props.task;

    return (
        <View style={[{ flexDirection: 'row'}, {backgroundColor: projectColors[localTask.projectId]}]}>
            <Text style={styles.projectClient}>{localTask.projectClient}</Text>
            <Text style={styles.description}>{localTask.description}</Text>
            <Text style={styles.dateTime}>{formatToStandardDateTime(localTask.startDateTime)}</Text>
            <Text style={styles.dateTime}>{formatToStandardDateTime(localTask.endDateTime)}</Text>
            <Text style={styles.duration}>{formatMsToHoursMinutes(localTask.endDateTime - localTask.startDateTime)}</Text>
            <View style={styles.buttons}>
                <Icon.Button name='edit' onPress={() => props.onEditClick(localTask)}>
                    Edit
                </Icon.Button>
            </View>
        </View>
    );        
};

// Setup the PropTypes
TaskDisplay.propTypes = {
    task: TaskType.isRequired,
    onEditClick: PropTypes.func.isRequired
};

// Export TaskDisplay
export default TaskDisplay;


// Styles for the Task
const styles = StyleSheet.create({
    projectClient: {
        flex: 1
    },

    description: {
        flex: 4
    },

    dateTime: {
        flex: 1
    },

    duration: {
        flex: 0.25
    },

    buttons: {
        flex: 0.5
    }
});

const projectColors = [
    'lightblue',
    'lightsteelblue',
    'palevioletred'
];
