import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { TaskList } from '../presentation/TaskList';
import { getTaskList } from '../../actions/task/taskListActions';

// Mapping for properties
const mapStateToProps = state => {
    return {
        taskList: state.tasks.taskList
    };
};

// Mapping for dispatches
const mapDispatchToProps = dispatch => {
    return { 
        onTaskDoubleClick: () => Alert.alert('Double-click!'),
        dispatchGetTaskList: () => dispatch(getTaskList())
    };
};

// Connect to Redux
export const ManageTasks = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList);
