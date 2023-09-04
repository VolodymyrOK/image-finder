import React, { Component } from 'react';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchImages } from './Services/api';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    currentSearch: '',
    totalImages: 0,
    page: 1,
    modalOpen: false,
    modalImg: '',
    modalAlt: '',
  };

  async componentDidUpdate(_, prevState) {
    const { page, currentSearch } = this.state;
    if (prevState.page !== page || prevState.currentSearch !== currentSearch) {
      this.setState({ isLoading: true });

      try {
        const { images, totalImages } = await fetchImages(currentSearch, 1);
        if (totalImages === 0) {
          alert('No images');
          return;
        }
        this.setState(prevState => {
          return { images: [...prevState.images, ...images], totalImages };
        });
      } catch (error) {
        console.log(error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    const inputSearch = e.target.elements.inputSearch;
    if (inputSearch.value.trim() === '') {
      return;
    }
    this.setState({
      currentSearch: inputSearch.value,
      page: 1,
      images: [],
      totalImages: 0,
    });
  };

  handleLoadMore = async () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  handleImageClick = ({ tags, largeImageURL }) => {
    this.setState({
      modalOpen: true,
      modalAlt: tags,
      modalImg: largeImageURL,
    });
  };

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
      modalAlt: '',
      modalImg: '',
    });
  };

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <Searchbar onSubmit={this.handleSubmit} />
            <ImageGallery
              onImageClick={this.handleImageClick}
              images={this.state.images}
            />
            {this.state.images.length > 0 ? (
              <Button onClick={this.handleLoadMore} />
            ) : null}
          </React.Fragment>
        )}
        {this.state.modalOpen ? (
          <Modal
            src={this.state.modalImg}
            alt={this.state.modalAlt}
            handleClose={this.handleModalClose}
          />
        ) : null}
      </div>
    );
  }
}
