import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { TaskList } from '../presentation/TaskList';
import { getProjectList } from '../../actions/project/projectListActions';
import { getTaskList } from '../../actions/task/taskListActions';

// Mapping for properties
const mapStateToProps = state => {
    return {
        taskList: state.tasks.taskList,
        projectList: state.projects.projectList
    };
};

// Mapping for dispatches
const mapDispatchToProps = dispatch => {
    return { 
        onTaskEditClick: (task) => Alert.alert('Editing Task #' + task.id + '!'),
        dispatchGetTaskList: () => dispatch(getTaskList())
    };
};

// Connect to Redux
export const TaskListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList);
