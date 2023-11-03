import { useEffect, useState } from 'react';

import { getImages } from 'services/api';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import Button from './Button/Button';

import MyModal from './Modal/MyModal';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      try {
        setLoading(true);
        const { hits, totalHits } = await getImages(query, page);
        if (hits.length === 0) {
          return alert('we dont find any images');
        }

        setImages(prevImages => [...prevImages, ...hits]);
        setTotalImages(totalHits);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const onHandleSubmit = value => {
    setQuery(value);
    setPage(1);
    setImages([]);
  };
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  const openModalWindow = (largeImageURL, tags) => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const handleCloseModalWindow = () => {
    setShowModal(false);
    setLargeImageURL('');
    setTags('');
  };

  const allPage = totalImages / images.length;
  return (
    <div>
      <Searchbar onSubmit={onHandleSubmit} />
      {loading && <Loader />}
      {error && <p style={{ color: 'red' }}>something went wrong</p>}
      {images.length !== 0 && (
        <ImageGallery images={images} openModalWindow={openModalWindow} />
      )}

      {allPage > 1 && !loading && images.length > 0 && (
        <Button onClick={handleLoadMore} />
      )}

      <MyModal
        largeImageURL={largeImageURL}
        tags={tags}
        modalIsOpen={showModal}
        closeModal={handleCloseModalWindow}
      />
    </div>
  );
}
