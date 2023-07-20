import React, { useState } from "react";
import RegistrationForm from './Components/RegistrationForm'
import DataDisplay from "./Components/DataDisplay";
import "./App.scss";

function App() {
  const [formData, setFormData] = useState([]);

  const updateFormData = (data) => {
    setFormData([...formData, data]);
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
