import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import PropTypes from 'prop-types';
import { ProjectType } from '../../config/projectPropTypes';
import { TaskType } from '../../config/taskPropTypes';
import { formatToStandardDateTime, formatMsToHoursMinutes } from '../../lib/dateFormat';

export class EditTask extends Component {
    
    // Constructor
    constructor(props) {
        
        // Call the base class
        super(props);

        // Now dispatch a call to the API for the Project list via the 
        // passed methods on Props
        props.dispatchGetProjectList();
    }
        
    // Render method
    render() {

        // Local storage for the Task
        let localTask = this.props.task;

        return (
            <View>
                <Text>PUT EDIT TASK HERE</Text>
            </View>
        );        
    }
}

// Setup the PropTypes
EditTask.propTypes = {
    projectList: PropTypes.arrayOf(ProjectType).isRequired,
    task: TaskType,
    onCompleteClick: PropTypes.func.isRequired,
    dispatchGetProjectList: PropTypes.func.isRequired
};
    