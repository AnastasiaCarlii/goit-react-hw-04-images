import React from 'react';

import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  openModalWindow,
}) => {
  return (
    <div className={css.imageItem}>
      <img
        className={css.img}
        src={webformatURL}
        alt={tags}
        onClick={() => {
          openModalWindow(largeImageURL, tags);
        }}
      />
    </div>
  );
};

export default ImageGalleryItem;
