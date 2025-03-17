import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import './ArtisanListing.css'; // Optional CSS file

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
    <div className="artisan-listing">
      <h2>Our Artisans</h2>
      {error && <p className="error">{error}</p>}
      <div className="artisan-grid">
        {artisans.map((artisan) => (
          <Link to={`/services/${artisan.email}`} key={artisan.email} className="artisan-card">
            <h3>{artisan.name}</h3>
            <p><strong>Professions:</strong> {artisan.professions.join(', ')}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArtisanListing;