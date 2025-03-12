import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './ArtisanListing.css'; // Optional CSS file

Modal.setAppElement('#root'); // For accessibility

const ArtisanListing = () => {
  const [artisans, setArtisans] = useState([]);
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/artisans');
        setArtisans(response.data);
      } catch (err) {
        setError('Failed to fetch artisans');
      }
    };
    fetchArtisans();
  }, []);

  const openModal = async (email) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/artisans/${email}`);
      setSelectedArtisan(response.data);
      setModalIsOpen(true);
    } catch (err) {
      setError('Failed to fetch artisan details');
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedArtisan(null);
  };

  return (
    <div className="artisan-listing">
      <h2>Our Artisans</h2>
      {error && <p className="error">{error}</p>}
      <div className="artisan-grid">
        {artisans.map((artisan) => (
          <div
            key={artisan.email}
            className="artisan-card"
            onClick={() => openModal(artisan.email)}
          >
            <h3>{artisan.name}</h3>
            <p><strong>Professions:</strong> {artisan.professions.join(', ')}</p>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px' },
        }}
      >
        {selectedArtisan && (
          <div className="artisan-details">
            <h2>{selectedArtisan.name}</h2>
            {selectedArtisan.profilePicture && (
              <img
                src={selectedArtisan.profilePicture}
                alt={selectedArtisan.name}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            )}
            <p><strong>Professions:</strong> {selectedArtisan.professions.join(', ')}</p>
            <p><strong>Description:</strong> {selectedArtisan.serviceDescription || 'No description available'}</p>
            <p><strong>Email:</strong> {selectedArtisan.email}</p>
            {selectedArtisan.phoneNumber && (
              <p><strong>Phone:</strong> {selectedArtisan.phoneNumber}</p>
            )}
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ArtisanListing;
