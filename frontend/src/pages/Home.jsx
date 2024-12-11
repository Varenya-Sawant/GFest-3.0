import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Carousel from '../components/Carousel';
import landingImage from '../images/landing.png';
import founderImage from '../images/founder.jpg';

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
