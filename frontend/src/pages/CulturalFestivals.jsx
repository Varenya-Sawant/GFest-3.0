import React from 'react';
import './CulturalFestivals.css'; // Create a CSS file for styling
import saoImage from '../images/saojao.jpg';
import bondImage from '../images/bonderam.jpg';

const CulturalFestivals = () => {
  return (
    <div className="cultural-festivals-container">
      <h1>Lesser-Known Festivals of Goa</h1>
      <p>
        While Goa is renowned for its vibrant beach parties and popular festivals, it is also home to a plethora of hidden gems that celebrate the rich cultural tapestry of the region. Join us as we explore some of the lesser-known festivals that showcase the traditions, art, and community spirit of Goa.
      </p>

      <div className="festival">
        <h2>1. Festa de São João</h2>
        <img src={saoImage} alt="Festa de São João" />
        <p>
          Celebrated in June, Festa de São João honors Saint John the Baptist. Locals jump into wells to retrieve floating pots, signifying the start of the monsoon. It’s a day filled with music, traditional Goan food, and joyous gatherings, especially among the village youth.
        </p>
      </div>

      <div className="festival">
        <h2>2. Bonderam Festival</h2>
        <img src={bondImage} alt="Bonderam Festival" />
        <p>
          Held on the islands of Divar, Bonderam is a unique celebration that commemorates the land disputes between villages in the past. It features colorful parades, traditional music, and people reenacting the historical land disputes with mock battles using bamboo sticks.
        </p>
      </div>

      <div className="festival">
        <h2>3. Shigmo Festival</h2>
        <img src="../Images/shigmo.jpg" alt="Shigmo Festival" />
        <p>
          Shigmo, celebrated in spring, is a traditional Goan festival that marks the arrival of spring. It includes vibrant processions, colorful floats, and folk dances that tell stories from Goan history. Locals often dress in traditional attire, and the streets come alive with music and dance.
        </p>
      </div>

      <div className="festival">
        <h2>4. Chorão's São Bartolomeu Feast</h2>
        <img src="../Images/sao_bartolomeu.jpg" alt="São Bartolomeu Feast" />
        <p>
          This feast is celebrated on August 24th in the village of Chorão. It includes a boat procession, where devotees carry the idol of Saint Bartholomew to the church. The event is marked by traditional Goan music, dance, and delicious local cuisine.
        </p>
      </div>

      <div className="festival">
        <h2>5. Carnival of Goa</h2>
        <img src="../Images/carnival.jpg" alt="Carnival of Goa" />
        <p>
          While the Carnival is known globally, the unique way it's celebrated in Goa often goes unnoticed. The festival features elaborate parades with floats, vibrant costumes, and the famous King Momo, who symbolizes revelry. Local communities participate by showcasing their cultural heritage through dance and music.
        </p>
      </div>

      <h2>Discover More!</h2>
      <p>
        Each of these festivals provides a glimpse into the unique traditions and vibrant culture of Goa. Whether you're a local or a visitor, participating in these celebrations allows you to connect with the community and experience the true essence of Goan culture. 
      </p>
    </div>
  );
};

export default CulturalFestivals;
