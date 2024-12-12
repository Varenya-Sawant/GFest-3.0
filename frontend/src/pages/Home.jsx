import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Carousel from '../components/Carousel';
import landingImage from '../images/landing.png';
import founderImage from '../images/founder.jpg';
import shopImage from '../images/shop.png';
import eventsImage from '../images/events.png';
import forumImage from '../images/forum.png';

const Home = () => {
  return (
    <div className="container">
      {/* Main Section with header and CTA */}
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
          {/* CTA right after the tagline */}
          <Link to="/events">
            <button className="cta-explore">Explore Events</button>
          </Link>
        </div>

        <div className="bigimage">
          <img src={landingImage} alt="Goa Festival Celebration" />
        </div>
      </main>

      {/* Carousel Component */}
      <Carousel />

      {/* Cards Section */}
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

      {/* Founder Message Section as a styled card */}
      <div className="founder-card-section">
        <div className="founder-card">
          <div className="founder-info">
            <img src={founderImage} alt="Marius Festekar" className="founder-image" />
            <h3 className="founder-name">Marius Festekar</h3>
          </div>
          <div className="founder-message-content">
            <h2>Message from the Founder</h2>
            <p>
              "Welcome to our celebration of the vibrant traditions and cultural essence of Goa. 
              Our journey connects art, culture, and community with unforgettable experiences. 
              Thank you for joining us!"
            </p>
            <Link to="/cultural-festivals">
              <button className="cta-large">Discover Goa's Festivals</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;