import PropTypes from 'prop-types';

const ImageGalleryItem = ({ id, webformatURL, tags }) => {
  return (
    <li key={id} className="ImageGalleryItem">
      <img src={webformatURL} alt={tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
