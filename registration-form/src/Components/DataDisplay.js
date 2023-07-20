import React from "react";
import "./DataDisplay.scss";

function DataDisplay({ formData }) {
  const hasFormData = formData.length > 0;
  if(hasFormData){
     return (
    <div className="data-display">
      <h2>STUDENTS DATA</h2>
      <div className="data-display-section">
      {formData.map((student, index) => (
        <div key={index} className="student-details">
          {student.photo && (
            <div>
              <img
                src={URL.createObjectURL(student.photo)}
                alt="Profile"
                height="200"
              />
            </div>
          )}
          <p>
            <strong>Name:</strong> {student.name}
          </p>
          <p>
            <strong>Email:</strong> {student.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {student.phoneNumber}
          </p>
          <p>
            <strong>Gender:</strong> {student.gender}
          </p>
          <p>
            <strong>Date of Birth:</strong> {student.dob}
          </p>
          <p>
            <strong>Address:</strong> {student.address}
          </p>
          <p>
            <strong>Portfolio:</strong>
            {student.portfolio && (
              <a
                href={student.portfolio}
                target="_blank"
                rel="noopener noreferrer"
              >
                {student.portfolio}
              </a>
            )}
          </p>
          <p>
            <strong>Skills:</strong> {student.skills.join(", ")}
          </p>
        </div>
      ))}</div>
    </div>
  );
  }
 
}

export default DataDisplay;
