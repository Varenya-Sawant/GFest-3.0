import React, { useState } from "react";
import locationIcon from "../../assets/location.png";
import phoneIcon from "../../assets/phone.png";
import emailIcon from "../../assets/email.png";
import "./Contact.css";
import founderImage from '../../images/goad.jpg';

const ContactUs = () => {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="contact-container">
      <h1 className='card-h1'>Contact Us</h1>
      <div className="goa-dialogue">
  <div className="image">
    <img src={founderImage} alt="Founder of GFest" />
  </div>
  <div className="mssg">
    <h2>Beyond the Beaches: The True Spirit of Goa</h2>
    <p>
      Goa is more than just a tourist hotspot—it's a rich cultural hub filled with history, traditions, and vibrant communities. 
      From its deep-rooted heritage to its thriving art and music scene, Goa represents a way of life that blends modernity 
      with timeless charm. It's about the people, the passion, and the stories that shape its identity beyond the golden sands.
    </p>
  </div>
</div>
      {/* Contact Info Section */}
      <div className="contact-info">
      
        <div className="contact-details">
          {/* Address Section */}
          <div className="contact-item">
            <img src={locationIcon} alt="Location" className="location-icon" />
            <h3 className="location-title">ADDRESS</h3>
            <p className="location-text"><strong>G-Fest Corporations</strong></p>
            <p className="location-text">123 Green Avenue, Orange City, 56789</p>
          </div>

          {/* Phone Section */}
          <div className="contact-item">
            <img src={phoneIcon} alt="Phone" className="phone-icon" />
            <h3 className="phone-title">PHONE</h3>
            <p className="phone-text"><strong>Customer Support</strong></p>
            <p className="phone-text">+1 234 567 890</p>
            <p className="phone-text">+1 987 654 321</p>
          </div>

          {/* Email Section */}
          <div className="contact-item">
            <img src={emailIcon} alt="Email" className="email-icon" />
            <h3 className="email-title">EMAIL</h3>
            <p className="email-text"><strong>General Inquiries</strong></p>
            <p className="email-text">info@company.com</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      

    </div>
  );
};

export default ContactUs;