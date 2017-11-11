import { connect } from 'react-redux';
import { TaskList } from '../presentation/TaskList';

// Mapping for properties
const mapStateToProps = state => {
    return {
        taskList: state.tasks.taskList
    };
};

// Mapping for dispatches
const mapDispatchToProps = dispatch => {
    return { 
        dispatch,
        onTaskDoubleClick: () => { return; }
    };
};

// Connect to Redux
export const ManageTasks = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList);
