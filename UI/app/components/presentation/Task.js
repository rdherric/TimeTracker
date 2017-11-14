import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { formatToStandardDateTime, formatMsToHoursMinutes } from '../../lib/dateFormat';
 
// Task class
export class Task extends Component {

    // Render method
    render() {

        // Local storage for the Task
        let localTask = this.props.task.item;

        return (
            <View style={[{ flexDirection: 'row'}, {backgroundColor: projectColors[localTask.projectId]}]}>
                <Text style={styles.projectClient}>{localTask.projectClient}</Text>
                <Text style={styles.description}>{localTask.description}</Text>
                <Text style={styles.dateTime}>{formatToStandardDateTime(localTask.startDateTime)}</Text>
                <Text style={styles.dateTime}>{formatToStandardDateTime(localTask.endDateTime)}</Text>
                <Text style={styles.duration}>{formatMsToHoursMinutes(localTask.endDateTime - localTask.startDateTime)}</Text>
                <View style={styles.buttons}>
                    <Icon.Button name='edit' onPress={() => this.props.onEditClick(localTask)}>
                        Edit
                    </Icon.Button>
                </View>
            </View>
        );        
    }
}

// Setup the PropTypes
Task.propTypes = {
    task: PropTypes.object.isRequired,
    onEditClick: PropTypes.func
};

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
