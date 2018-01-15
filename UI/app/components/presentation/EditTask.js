import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { STATUS_NEVER_PROCESSED } from '../../actions/base/statusConstants';
import { StatusType } from '../../config/statusPropTypes';
import { ProjectType } from '../../config/projectPropTypes';
import { TaskType, TaskConstraints } from '../../config/taskPropTypes';
import { formatToStandardDateTime, formatMsToHoursMinutes } from '../../lib/dateFormat';
import { ReduxFormTextArea, required, maxDescriptionLength } from './ReduxFormControls';

const EditTask = (props) => {
    
    // If the ProjectList has never been retrieved before, do it now
    if (props.projectUi.status === STATUS_NEVER_PROCESSED) {
        props.dispatchGetProjectList();
    }

    // Submit Handler
    const { handleSubmit } = props;

    // Local storage for the Task
    let localTask = props.task;

    return (
        <View>
            <Field name="description" component={ReduxFormTextArea} label="Description" validate={[ required, maxDescriptionLength ]} />
            <Button title="Submit" onPress={handleSubmit(submit)} />
        </View>
    );        
};

// Method to perform the validation and submit
const submit = (values) => {
    console.log(values);
};

// Setup the PropTypes
EditTask.propTypes = {
    projectList: PropTypes.arrayOf(ProjectType).isRequired,
    projectUi: StatusType,
    task: TaskType,
    onCompleteClick: PropTypes.func.isRequired,
    dispatchGetProjectList: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

// Export the EditTask form as a reduxForm
export default reduxForm({
    form: 'EditTask'
})(EditTask);
