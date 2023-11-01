import React from 'react';

import css from './ImageGallery.module.css';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, openModalWindow }) => {
  return (
    <div className={css.galleryList}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          largeImageURL={largeImageURL}
          openModalWindow={openModalWindow}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
