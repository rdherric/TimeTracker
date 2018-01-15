import React, { Component } from 'react';
import { View } from 'react-native';
import { EditTaskContainer } from '../container/EditTaskContainer';
import { TaskListContainer } from '../container/TaskListContainer';
 
// TaskTab class
const TaskTab = () => (
    <View>
        <EditTaskContainer />
        <TaskListContainer />
    </View>
);

// Export TaskTab
export default TaskTab;