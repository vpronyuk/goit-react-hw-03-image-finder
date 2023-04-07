import PropTypes from 'prop-types';

const Button = ({ onClick, isLoading }) => {
  return (
    <button type="button" className="Button" onClick={onClick}>
      {isLoading ? 'Loading...' : 'Load more'}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default Button;
