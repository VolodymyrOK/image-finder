import css from './imageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, onClick }) => (
  <li id={image.id} className={css.imageGalleryItem}>
    <img
      onClick={() => onClick(image.tags, image.largeImageURL)}
      src={image.webformatURL}
      alt={image.tags}
      className={css.imageGalleryItemImage}
    />
  </li>
);
