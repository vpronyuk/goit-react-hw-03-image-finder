import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ requestedImg }) => (
  <ul className="ImageGallery">
    {requestedImg.map(({ id, webformatURL, tags }) => (
      <ImageGalleryItem
        key={id}
        id={id}
        webformatURL={webformatURL}
        tags={tags}
      />
    ))}
  </ul>
);

export default ImageGallery;
