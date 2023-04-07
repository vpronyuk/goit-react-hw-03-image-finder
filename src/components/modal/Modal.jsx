import { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles/styles.css';

class Modal extends Component {
  static propTypes = {
    selectedImg: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.keyCode === 27) {
      this.props.onClose();
    }
  };

  handleOverlayClick = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    return (
      <div className="Overlay" onClick={this.handleOverlayClick}>
        <div className="Modal">
          <img src={this.props.selectedImg} alt="Pixabay" />
        </div>
      </div>
    );
  }
}

export default Modal;
