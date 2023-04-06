import PropTypes from 'prop-types';
import { Component } from 'react';

class ImageGalleryItem extends Component {
  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string,
    tags: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  handleImgClick = () => {
    this.props.onSelect(this.props.largeImageURL);
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props;

    return (
      <li className="ImageGalleryItem">
        <img src={webformatURL} alt={tags} onClick={this.handleImgClick} />
        {largeImageURL && (
          <div className="Overlay">
            <div className="Modal">
              <img src={largeImageURL} alt={tags} />
            </div>
          </div>
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;
