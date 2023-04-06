import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  static propTypes = {
    requestedImg: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  render() {
    const { requestedImg, onSelect } = this.props;

    return (
      <ul className="ImageGallery">
        {requestedImg.map(({ id, webformatURL, tags, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            onSelect={() => onSelect(largeImageURL)}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
