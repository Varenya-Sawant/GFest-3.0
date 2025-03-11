import React, { useState } from "react";
import locationIcon from "../../assets/location.png";
import phoneIcon from "../../assets/phone.png";
import emailIcon from "../../assets/email.png";
import "./Contact.css";

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
      {/* Contact Info Section */}
      <div className="contact-info">
        <h2 className="contact-heading">Contact Us</h2>
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
      <div className="contact-form-container">
        <div className="form-info">
          <h2 className="form-title">The Festival Man of Goa</h2>
          <p className="form-description">
            If you wish to know more about our Founder click 
            <a href="https://www.newindianexpress.com/magazine/2024/Nov/02/the-festival-man-of-goa" className="job-link"> here </a>
            for more information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="input-group">
            <input 
              type="text" 
              name="firstName" 
              placeholder="First Name" 
              value={formData.firstName} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="text" 
              name="lastName" 
              placeholder="Last Name" 
              value={formData.lastName} 
              onChange={handleChange} 
              required 
            />
          </div>

          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />

          <textarea 
            name="message" 
            rows="4" 
            placeholder="Comments" 
            value={formData.message} 
            onChange={handleChange} 
            required
          ></textarea>

          <button type="submit" className="submit-button">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
