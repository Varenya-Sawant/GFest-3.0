import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Assuming you have the CSS in a separate file
import Carousel from '../components/Carousel'; // Importing the Carousel component
import landingImage from '../images/landing.png';
import shopImage from '../images/shop.png';
import eventsImage from '../images/events.png';
import forumImage from '../images/forum.png';

const Home = () => {
  return (
    <div className="container">
      <main>
        <div className="bigname">
          <h1>
            Celebrate <span>Goa's</span>
          </h1>
          <h1>Vibrant Festivals!</h1>
          <h2>
            Discover Goa’s festivals, traditions, and artistry. Connect with our
            community and explore local events.
          </h2>
          <Link to="/events">
            <button className="cta">Explore Events!</button>
          </Link>
        </div>

        <div className="bigimage">
          <img src={landingImage} alt="Goa Festival Celebration" />
        </div>
      </main>

      {/* Carousel component */}
      <Carousel />

      <div className="cards">
        <div className="card">
          <h2>SHOP</h2>
          <img src={shopImage} alt="Shop with Goa artisans" />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium
            reprehenderit eveniet facere, nemo optio vero.
          </p>
          <Link to="/shop">
            <button>Learn More!</button>
          </Link>
        </div>

        <div className="card">
          <h2>EVENTS</h2>
          <img src={eventsImage} alt="Goa Events" />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium
            reprehenderit eveniet facere, nemo optio vero.
          </p>
          <Link to="/events">
            <button>Learn More!</button>
          </Link>
        </div>

        <div className="card">
          <h2>FORUMS</h2>
          <img src={forumImage} alt="Community Forums" />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium
            reprehenderit eveniet facere, nemo optio vero.
          </p>
          <Link to="/forum">
            <button>Learn More!</button>
          </Link>
        </div>
      </div>

      {/* New section for showcasing Goa's cultural festivals */}
      <div className="culture-section">
        <h2>Explore the Beauty of Goa's Cultural Festivals</h2>
        <Link to="/cultural-festivals">
          <button className="large-button">Discover Goa's Festivals</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
