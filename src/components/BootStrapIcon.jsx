import PropTypes from 'prop-types';

export default function BootStrapIcon({ iconId, className = "", children }) {
    return (
        <i className={`bi bi-${iconId} ${className}`}>{children}</i>
    );
}

BootStrapIcon.propTypes = {
    iconId: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.node
}