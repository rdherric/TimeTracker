import React, { Component } from 'react';
import { View } from 'react-native';
import { EditTaskContainer } from '../container/EditTaskContainer';
import { TaskListContainer } from '../container/TaskListContainer';
 
// TaskTab class
export class TaskTab extends Component {

    // Render method
    render() {

        return (
            <View>
                <EditTaskContainer />
                <TaskListContainer />
            </View>
        );        
    }
}
