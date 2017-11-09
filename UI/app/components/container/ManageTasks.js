import { connect } from 'react-redux';
import TaskList from '../presentation/TaskList';

// Mapping for properties
const mapStateToProps = state => {
    return {
        taskList: state.tasks.taskList
    };
};

// Mapping for dispatches
const mapDispatchToProps = dispatch => {
    return { 
        onTaskDoubleClick: () => { return; }
    };
};

// Connect to Redux
const ManageTasks = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList);

// Export the default
export default ManageTasks;