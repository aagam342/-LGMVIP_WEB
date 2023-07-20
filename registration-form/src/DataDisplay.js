import React from "react";
import "./DataDisplay.scss";
function DataDisplay({ formData }) {
  return (
    <div>
      <div className="data-display">
        <h2>REGISTRATION DATA</h2>
        {formData.photo && (
          <div>
            <img
              src={URL.createObjectURL(formData.photo)}
              alt="Profile"
              height="200"
            />
          </div>
        )}
        <p>
          <strong>Name:</strong> {formData.name}
        </p>
        <p>
          <strong>Email:</strong> {formData.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {formData.phoneNumber}
        </p>
        <p>
          <strong>Gender:</strong> {formData.gender}
        </p>
        <p>
          <strong>Date of Birth:</strong> {formData.dob}
        </p>
        <p>
          <strong>Address:</strong> {formData.address}
        </p>
        <p>
          <strong>Portfolio:</strong>
          {formData.portfolio && (
            <a
              href={formData.portfolio}
              target="_blank"
              rel="noopener noreferrer"
            >
              {formData.portfolio}
            </a>
          )}
        </p>
        <p>
          <strong>Skills:</strong> {formData.skills.join(", ")}
        </p>
      </div>
    </div>
  );
}

export default DataDisplay;
