import PropTypes from 'prop-types';

// PropTypes for the Status object
export const StatusType = PropTypes.shape({
    status: PropTypes.string.isRequired,
    error: PropTypes.string
});
