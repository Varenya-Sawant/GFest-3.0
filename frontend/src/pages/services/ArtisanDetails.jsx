import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import './ArtisanDetails.css';

const ArtisanDetails = () => {
  const { email } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArtisan = async () => {
      try {
        const response = await axios.get(`http://192.168.152.58:3000/api/artisans/${email}`);
        setArtisan(response.data);
      } catch (err) {
        setError('Failed to fetch artisan details');
      }
    };
    fetchArtisan();
  }, [email]);

  if (!artisan) return <div className="artisan-loading">Loading...</div>;

  return (
    <div className="artisan-details-container">
      <h2 className="artisan-title">{artisan.name}</h2>

      <div className="artisan-details-card">
        <p className="artisan-detail">
          <span>Professions:</span> {artisan.professions.join(', ')}
        </p>
        <p className="artisan-detail artisan-description">
          <span>Description:</span> {artisan.serviceDescription || 'No description available'}
        </p>
        <p className="artisan-detail">
          <span>Email:</span> {artisan.email}
        </p>
        {artisan.phoneNumber && (
          <p className="artisan-detail">
            <span>Phone:</span> {artisan.phoneNumber}
          </p>
        )}
        {error && <p className="artisan-error">{error}</p>}
      </div>
    </div>
  );
};

export default ArtisanDetails;