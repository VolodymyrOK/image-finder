import css from './modal.module.css';

export const Modal = ({ src, alt, handleClose }) => (
  <div onClick={handleClose} className={css.overlay}>
    <div className={css.modal}>
      <img src={src} alt={alt} />
    </div>
  </div>
);

export class Modal2 {
  handleClose = e => {
    if (e.code === 'Escape') {
      this.handleModalClose();
    }
  };

  async componentDidMount() {
    document.addEventListener('keydown', this.handleClose);
  }

  render() {
    return (
      <div onClick={this.props.handleClose} className={css.overlay}>
        <div className={css.modal}>
          <img src={this.props.src} alt={this.props.alt} />
        </div>
      </div>
    );
  }
}
