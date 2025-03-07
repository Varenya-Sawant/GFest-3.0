import React, { useState } from "react";
import "./Contact.css"; // Import the CSS for styling
import FormModal from '../../components/FormModal'; // Import the new FormModal component
import telephoneImage from "../../assets/Telephone.png";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-box">
        <h2 className="contact-title">CONTACT US</h2>
        
        {/* Image Section */}
        <div className="contact-image-container">
        <img src={telephoneImage} alt="Telephone" className="contact-image" />


        <form className="contact-form">
          <input type="text" placeholder="Full Name*" className="contact-input" />
          <input type="email" placeholder="Email*" className="contact-input" />
          <input type="tel" placeholder="Phone*" className="contact-input" />
          <input type="text" placeholder="Subject*" className="contact-input" />
          <textarea placeholder="Message*" className="contact-input contact-textarea"></textarea>
          <button type="submit" className="contact-button">SUBMIT</button>
        </form>
        </div>


        <div className="contact-info">
          <p>📍 Don Bosco College, Panjim-Goa      ||         📞 +91 345678903</p>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;
