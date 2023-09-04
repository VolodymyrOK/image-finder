import css from './imageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, onClick }) => (
  <li id={image.id} onClick={onClick} className={css.imageGalleryItem}>
    <img
      src={image.webformatURL}
      alt={image.tags}
      name={image.largeImageURL}
      className={css.imageGalleryItemImage}
    />
  </li>
);
