import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import DataDisplay from "./DataDisplay";
import "./App.scss";

function App() {
  const [formData, setFormData] = useState(null);

  const updateFormData = (data) => {
    setFormData(data);
  };
  return (
    <div>
      <h1 className="app-heading">STUDENT REGISTRATION FORM</h1>
      <div className="app-container">
        <div className="form-container">
          <RegistrationForm updateFormData={updateFormData} />
        </div>
        <div className="data-container">
          {formData && <DataDisplay formData={formData} />}
        </div>
      </div>
    </div>
  );
}

export default App;
