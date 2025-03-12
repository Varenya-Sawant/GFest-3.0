import React, { useState } from "react";
import "./Contact.css"; // Import the CSS for styling
import FormModal from '../../components/FormModal'; // Import the new FormModal component

const Contact = () => {
  const [activeRole, setActiveRole] = useState(null);

  const roles = [
    { id: 1, name: "Seller", description: "Become a seller and showcase your products." },
    { id: 2, name: "Host", description: "Host an event directly on submission." },
    { id: 3, name: "Artisan", description: "Register as an artisan with service details." },
    { id: 4, name: "Other", description: "Reach out for other inquiries." },
    { id: 5, name: "Advertise", description: "Advertise your business with us." },
  ];

  const handleRoleClick = (role) => {
    setActiveRole(role);
  };

  const closeModal = () => {
    setActiveRole(null);
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="roles-list">
        {roles.map((role) => (
          <div key={role.id} className="role-card">
            <h3>{role.name}</h3>
            <p>{role.description}</p>
            <button
              className="register-button"
              onClick={() => handleRoleClick(role.name)}
            >
              Register
            </button>
          </div>
        ))}
      </div>

      {activeRole && (
        <FormModal role={activeRole} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Contact;
