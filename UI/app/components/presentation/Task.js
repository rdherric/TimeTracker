import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DATE_FORMAT, DURATION_FORMAT } from '../../lib/dateFormat';
 
// Task class
export class Task extends Component {

    // Render method
    render() {

        // Local storage for the Task
        let localTask = this.props.task.item;

        // Setup moment
        moment.locale('en');

        return (
            <View style={{ flexDirection: 'row'}}>
                <Text style={{ flex: 1 }}>{localTask.id}</Text>
                <Text style={{ flex: 1 }}>{localTask.projectClient}</Text>
                <Text style={{ flex: 1 }}>{localTask.description}</Text>
                <Text style={{ flex: 1 }}>{moment(localTask.startDateTime).format(DATE_FORMAT)}</Text>
                <Text style={{ flex: 1 }}>{moment(localTask.endDateTime).format(DATE_FORMAT)}</Text>
                <Text style={{ flex: 1 }}>{moment.utc(localTask.endDateTime - localTask.startDateTime).format(DURATION_FORMAT)}</Text>
                <Button style={{ flex: 1 }} onPress={() => this.props.onEditClick(localTask)} title='EDIT' />
            </View>
        );        
    }
}

// Setup the PropTypes
Task.propTypes = {
    task: PropTypes.object.isRequired,
    onEditClick: PropTypes.func
};
