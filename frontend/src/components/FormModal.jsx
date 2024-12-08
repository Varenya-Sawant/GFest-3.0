import React, { useState } from "react";
import "./FormModal.css"; // Add relevant styles

const FormModal = ({ role, closeModal }) => {
  const [termsChecked, setTermsChecked] = useState(false); // For Host terms and conditions

  const handleTermsChange = () => {
    setTermsChecked(!termsChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic based on role
    console.log(`${role} form submitted`);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{role} Registration</h2>
        <form onSubmit={handleSubmit}>
          {role === "Seller" && (
            <>
              <label>
                Upload your product details (PDF):
                <input type="file" required />
              </label>
              <label>
                <input type="checkbox" required />
                I agree to the terms and conditions
              </label>
              <button type="submit">Submit</button>
            </>
          )}

          {role === "Host" && (
            <>
              <label>
                <input
                  type="checkbox"
                  checked={termsChecked}
                  onChange={handleTermsChange}
                />
                I agree to all the terms and conditions
              </label>
              <button type="submit" disabled={!termsChecked}>
                Submit
              </button>
            </>
          )}

          {role === "Artisan" && (
            <>
              <label>Type of Service:</label>
              <input type="text" required />
              <label>Price:</label>
              <input type="text" required />
              <label>Description:</label>
              <textarea required />
              <button type="submit">Submit</button>
            </>
          )}

          {role === "Other" && (
            <>
              <label>Inquiry Title:</label>
              <input type="text" required />
              <label>Description:</label>
              <textarea required />
              <button type="submit">Submit</button>
            </>
          )}

          {role === "Advertise" && (
            <>
              <label>Upload your advertisement image:</label>
              <input type="file" required />
              <button type="submit">Submit</button>
            </>
          )}

          <button type="button" onClick={closeModal} className="close-button">
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
