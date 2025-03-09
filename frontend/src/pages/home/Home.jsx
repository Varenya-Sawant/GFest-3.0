import React from 'react';
import { Link } from 'react-router';
import './Home.css';
import Carousel from '../../components/Carousel';
import landingImage from '../../images/landing.png';
import founderImage from '../../images/founder.jpg';
import shopImage from '../../images/shop.png';
import eventsImage from '../../images/events.png';
import forumImage from '../../images/forum.png';

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
          <Link to="/cultural-festivals">
              <button className="cta-large">Discover Goa's Festivals</button>
            </Link>
        </div>

        <div className="bigimage">
          <img src={landingImage} alt="Goa Festival Celebration" />
        </div>
      </main>

      {/* Marquee */}
      <div className='marquee-container'>
      <marquee behavior="scroll" direction="left" scrollamount="15">
       Innovation, <span className='newColor'>Creativity</span> , Celebration, <span className='newColor'>Transformation! </span> 
      </marquee>
    </div>

      {/* Carousel Component */}
      <Carousel />

      {/* Cards Section */}
      <h3>Ministries</h3>
      <div className="card-section">
      <Link to="/events" className="card">
        <img src={founderImage} alt="Events" />
        <h3>Events</h3>
      </Link>
      <Link to="/shop" className="card">
        <img src={founderImage} alt="Shop" />
        <h3>Shop</h3>
      </Link>
      <Link to="/services" className="card">
        <img src={founderImage} alt="Services" />
        <h3>Services</h3>
      </Link>
      <Link to="/forums" className="card">
        <img src={founderImage} alt="Forums" />
        <h3>Forums</h3>
      </Link>
    </div>

      {/* Founder Message Section as a styled card */}
      <div className="founder-section">
  <div className="content">
    <p>
      Hello there folkes! I am Marius Festekar, the founder of GFest! I wish all of yourl a hearty welcome and hope yourl to be a part of our community! Viva Goa
    </p>
  </div>
  <div className="image-container">
  <img src={founderImage} alt="founder" />
  </div>
</div>

     
    </div>
  );
};

export default Home;