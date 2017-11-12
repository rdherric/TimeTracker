import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { DATE_FORMAT } from '../../lib/dateFormat';
 
// Task class
export class Task extends Component {

    // Render method
    render() {

        // Local storage for the Task
        let localTask = this.props.task;

        // Setup Moment
        Moment().locale('en');

        return (
            <TouchableHighlight onPress={this.props.onDoubleClick}>
                <View style={{ flexDirection: 'row'}}>
                    <Text style={{ flex: 1 }}>{localTask.id}</Text>
                    <Text style={{ flex: 1 }}>{localTask.projectClient}</Text>
                    <Text style={{ flex: 1 }}>{localTask.description}</Text>
                    <Text style={{ flex: 1 }}>{Moment(localTask.startDateTime).format(DATE_FORMAT)}</Text>
                    <Text style={{ flex: 1 }}>{Moment(localTask.endDateTime).format(DATE_FORMAT)}</Text>
                    <Text style={{ flex: 1 }}>{Moment(localTask.endDateTime - localTask.startDateTime).format('hh:mm')}</Text>
                </View>
            </TouchableHighlight>
        );        
    }
}

// Setup the PropTypes
Task.propTypes = {
    task: PropTypes.object.isRequired,
    onDoubleClick: PropTypes.func
};
