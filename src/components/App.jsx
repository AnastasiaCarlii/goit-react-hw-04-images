import React, { Component } from 'react';

import { getImages } from 'services/api';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import Button from './Button/Button';

import MyModal from './Modal/MyModal';

export default class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    totalImages: 0,
    showModal: false,
    largeImageURL: '',
    tags: '',
    loading: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages(query, page);
    }
  }

  fetchImages = async (query, page) => {
    try {
      this.setState({ loading: true });
      const { hits, totalHits } = await getImages(query, page);
      if (hits.length === 0) {
        return alert('we dont find any images');
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        totalImages: totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  onHandleSubmit = value => {
    this.setState({
      query: value,
      page: 1,
      images: [],
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModalWindow = (largeImageURL, tags) => {
    this.setState({ showModal: true, largeImageURL, tags });
  };

  handleCloseModalWindow = () => {
    this.setState({ showModal: false, largeImageURL: '', tags: '' });
  };

  render() {
    const {
      images,
      loading,
      totalImages,
      showModal,
      largeImageURL,
      tags,
      error,
    } = this.state;
    const allPage = totalImages / images.length;
    return (
      <div>
        <Searchbar onSubmit={this.onHandleSubmit} />
        {loading && <Loader />}
        {error && <p style={{ color: 'red' }}>something went wrong</p>}
        {images.length !== 0 && (
          <ImageGallery
            images={images}
            openModalWindow={this.openModalWindow}
          />
        )}

        {allPage > 1 && !loading && images.length > 0 && (
          <Button onClick={this.handleLoadMore} />
        )}

        <MyModal
          largeImageURL={largeImageURL}
          tags={tags}
          modalIsOpen={showModal}
          closeModal={this.handleCloseModalWindow}
        />
      </div>
    );
  }
}
