import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ requestedImg, page }) => (
  <ul className="ImageGallery">
    {requestedImg.map(({ id, webformatURL, tags }, index) => (
      <ImageGalleryItem
        key={`${id}-${index}-${page}`}
        id={id}
        webformatURL={webformatURL}
        tags={tags}
      />
    ))}
  </ul>
);

export default ImageGallery;
