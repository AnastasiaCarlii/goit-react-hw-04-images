import Modal from 'react-modal';
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },

  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '70%',
    overflow: 'hidden',
    maxWidth: '1000px',
    maxHeight: '600px',
  },
};
Modal.setAppElement('#root');

const MyModal = ({ largeImageURL, tags, modalIsOpen, closeModal }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <img
        src={largeImageURL}
        alt={tags}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Modal>
  );
};

export default MyModal;
