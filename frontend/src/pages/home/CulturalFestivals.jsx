import React from 'react';
import './CulturalFestivals.css';
import saoImage from '../../images/saojao.jpg';
import bondImage from '../../images/bonderam.jpg';
import shigImage from '../../images/shigmo.png';
import carImage from '../../images/carnival.jpg';
import chikImage from '../../images/chikalkalo.jpg';
import makImage from '../../images/makhar.jpg';


const CulturalFestivals = () => {
  const festivals = [
    {
      id: 1,
      name: 'Festa de São João',
      image: saoImage,
      description:
        'Celebrated in June, Festa de São João honors Saint John the Baptist. Locals jump into wells to retrieve floating pots, signifying the start of the monsoon. It’s a day filled with music, traditional Goan food, and joyous gatherings, especially among the village youth.',
    },
    {
      id: 2,
      name: 'Bonderam Festival',
      image: bondImage,
      description:
        'Held on the islands of Divar, Bonderam is a unique celebration that commemorates the land disputes between villages in the past. It features colorful parades, traditional music, and people reenacting the historical land disputes with mock battles using bamboo sticks.',
    },
    {
      id: 3,
      name: 'Shigmo Festival',
      image: shigImage,
      description:
        'Shigmo, celebrated in spring, is a traditional Goan festival that marks the arrival of spring. It includes vibrant processions, colorful floats, and folk dances that tell stories from Goan history. Locals often dress in traditional attire, and the streets come alive with music and dance.',
    },
    {
      id: 4,
      name: 'Chikhal Kalo ',
      image: chikImage,
      description:
        'A vibrant celebration inspired by Krishna’s childhood. Villagers gather on the twelfth day of Ashadh in front of Goa\'s only Devaki-Krishna temple with music, songs, and puran polis. It invites participants to let go of inhibitions and embrace joy—India’s version of La Tomatina.',
    },
    {
      id: 5,
      name: 'Carnival of Goa',
      image: carImage,
      description:
        'While the Carnival is known globally, the unique way it\'s celebrated in Goa often goes unnoticed. The festival features elaborate parades with floats, vibrant costumes, and the famous King Momo, who symbolizes revelry. Local communities participate by showcasing their cultural heritage through dance and music.',
    },
    {
      id: 6,
      name: 'Dance of the Makhars',
      image: makImage,
      description:
        'Huge decorative wooden frames featured during Navratri in Goa temples, symbolizing the divine feminine spirit. The idols are moved to rhythmic music each night, known as the dance of the Makhars. Crafted from wooden skeletons and decorated with fresh paper craft annually, they showcase different goddess dressings daily, with Veling’s celebration being a favorite.',
    },
  ];

  return (
    <div className="cultural-festivals-container">
      <h1>Lesser-Known Festivals of Goa</h1>
      <p>
        While Goa is renowned for its vibrant beach parties and popular festivals, it is also home to a plethora of hidden gems that celebrate the rich cultural tapestry of the region. Join us as we explore some of the lesser-known festivals that showcase the traditions, art, and community spirit of Goa.
      </p>
      <div className="festivals-grid">
        {festivals.map((festival) => (
          <div key={festival.id} className="festival-card">
            <h2>{festival.name}</h2>
            <img src={festival.image} alt={festival.name} />
            <p>{festival.description}</p>
          </div>
        ))}
      </div>
      <div className="cta-section">
        <h2>Discover More!</h2>
        <p>
          Each of these festivals provides a glimpse into the unique traditions and vibrant culture of Goa. Whether you're a local or a visitor, participating in these celebrations allows you to connect with the community and experience the true essence of Goan culture.
        </p>
      </div>
    </div>
  );
};

export default CulturalFestivals;
