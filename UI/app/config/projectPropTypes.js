import PropTypes from 'prop-types';

// PropTypes for a Project object
export const ProjectType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    client: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isDefault: PropTypes.bool.isRequired
});
