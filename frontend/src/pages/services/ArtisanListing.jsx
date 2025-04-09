import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import './ArtisanListing.css';

const ArtisanListing = () => {
  const [artisans, setArtisans] = useState([]);
  const [error, setError] = useState('');

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

  return (
    <div className="artisan-listing-container">
      <h2 className="artisan-listing-title">Our Artisans</h2>
      {error && <p className="artisan-error">{error}</p>}
      {artisans.length === 0 && !error ? (
        <p className="artisan-loading">Loading artisans...</p>
      ) : (
        <div className="artisan-grid">
          {artisans.map((artisan) => (
            <Link
              to={`/services/${artisan.email}`}
              key={artisan.email}
              className="artisan-card-link"
            >
              <div className="artisan-card">
                <h3 className="artisan-name">{artisan.name}</h3>
                <p className="artisan-professions">
                  <span>Professions:</span> {artisan.professions.join(', ')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtisanListing;