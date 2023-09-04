import css from './modal.module.css';

export const Modal = ({ src, alt, handleClose }) => (
  <div onClick={handleClose} className={css.overlay}>
    <div className={css.modal}>
      <img src={src} alt={alt} />
    </div>
  </div>
);
