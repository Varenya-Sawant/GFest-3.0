import React from 'react';
import { Link } from 'react-router';
import './Home.css';
import Carousel from '../../components/Carousel';
import landingImage from '../../images/landing.png';
import founderImage from '../../images/founder.jpg';
import shopImage from '../../images/Shop1.png';
import forumImage from '../../images/Forums1.png';
import servicesImage from '../../images/Services.png';
import eventImage from '../../images/Events2.png';

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
          <h2 className='cta-msg'>
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
      <h1 className='card-h1'>Featured</h1>
      <Carousel />

      {/* Cards Section */}
      <h1 className='card-h1'>Ministries</h1>
      <div className="card-section">
      <Link to="/events" className="card">
        <img src={eventImage} alt="Events" />
        <h3>Events</h3>
      </Link>
      <Link to="/shop" className="card">
        <img src={shopImage} alt="Shop" />
        <h3>Shop</h3>
      </Link>
      <Link to="/services" className="card">
        <img src={servicesImage} alt="Services" />
        <h3>Services</h3>
      </Link>
      <Link to="/forums" className="card">
        <img src={forumImage} alt="Forums" />
        <h3>Forums</h3>
      </Link>
    </div>

      {/* Founder Message Section as a styled card */}
      <h1 className='card-h1'>Message from Founder</h1>
      <div className="founder-section">
  <div className="content">
    <p>
      👋 Hello there, folks! I’m <strong>Marius Festekar</strong>, the founder of G-Fest!  
      A warm welcome to all of you—I hope you become part of our amazing community.  
      Let’s celebrate together! <span className="viva-goa">Viva Goa! 🎉</span>
    </p>
  </div>
  <div className="image-container">
    <img src={founderImage} alt="Founder of G-Fest" />
  </div>
</div>


     
    </div>
  );
};

export default Home;