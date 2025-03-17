import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

const ArtisanDetails = () => {
  const { email } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArtisan = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/artisans/${email}`);
        console.log({ data: response });

        setArtisan(response.data);
      } catch (err) {
        setError('Failed to fetch artisan details');
      }
    };
    fetchArtisan();
  }, [email]);

  if (!artisan) return <p>Loading...</p>;
  console.log({ artisan });

  return (
    <div className="artisan-details">
      <h2>{artisan.name}</h2>
      <p><strong>Professions:</strong> {artisan.professions.join(', ')}</p>
      <p><strong>Description:</strong> {artisan.serviceDescription || 'No description available'}</p>
      <p><strong>Email:</strong> {artisan.email}</p>
      {artisan.phoneNumber && (
        <p><strong>Phone:</strong> {artisan.phoneNumber}</p>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ArtisanDetails;