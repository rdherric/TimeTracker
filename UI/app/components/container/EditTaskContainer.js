import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { EditTask } from '../presentation/EditTask';
import { getProjectList } from '../../actions/project/projectListActions';
import { addTask, updateTask } from '../../actions/task/taskOperationActions';

// Mapping for properties
const mapStateToProps = (state, ownProps) => {
    return {
        projectList: state.projects.projectList,
        task: ownProps.task
    };
};

// Mapping for dispatches
const mapDispatchToProps = dispatch => {
    return { 
        onCompleteClick: (task) => Alert.alert('Completed Task ' + task.description + '!'),
        dispatchGetProjectList: () => dispatch(getProjectList())
    };
};

// Connect to Redux
export const EditTaskContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTask);
