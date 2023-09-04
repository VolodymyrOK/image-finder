import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './imageGallery.module.css';

export const ImageGallery = ({ images, onImageClick }) => (
  <ul className={css.imageGallery}>
    {images.map((image, index) => (
      <ImageGalleryItem onClick={onImageClick} image={image} key={index} />
    ))}
  </ul>
);
