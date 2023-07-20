import React, { useState } from "react";
import "./RegistrationForm.scss";

const initialFormData = {
  name: "",
  email: "",
  phoneNumber: "",
  gender: "",
  dob: "",
  address: "",
  photo: "",
  portfolio: "",
  skills: [],
  password: "",
  confirmPassword: "",
};

function RegistrationForm({ updateFormData }) {
  const [formData, setFormData] = useState(initialFormData);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (checked) {
        setFormData({ ...formData, skills: [...formData.skills, value] });
      } else {
        setFormData({
          ...formData,
          skills: formData.skills.filter((skill) => skill !== value),
        });
      }
    } else if (type === "file") {
      setFormData({ ...formData, [id]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = (event) => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    event.preventDefault();
    updateFormData(formData);
    setFormData(initialFormData);
    document.getElementById("photo").value = "";
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  return (
    <div className="registration-form">
      <h2>REGISTRATION FORM</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">NAME :</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">EMAIL</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="phoneNumber">PHONE NUMBER</label>
        <input
          type="tel"
          id="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <label htmlFor="gender">GENDER</label>
        <select
          value={formData.gender}
          id="gender"
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="dob">DATE OF BIRTH</label>
        <input
          type="date"
          value={formData.dob}
          id="dob"
          onChange={handleChange}
          required
        />

        <label htmlFor="address">ADDRESS</label>
        <textarea
          value={formData.address}
          id="address"
          cols="20"
          rows="5"
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="photo">PROFILE PHOTO</label>
        <input type="file" id="photo" onChange={handleChange} required />

        <label htmlFor="portfolio">PORTFOLIO</label>
        <input
          type="text"
          id="portfolio"
          value={formData.portfolio}
          onChange={handleChange}
          required
        />
        <label>SKILLS</label>
        <div className="skills-container">
          <label htmlFor="skill1" className="skill">
            C/C++
            <input
              type="checkbox"
              id="skill1"
              value="C/C++"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="skill2" className="skill">
            Java
            <input
              type="checkbox"
              id="skill2"
              value="Java"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="skill3" className="skill">
            Python{" "}
            <input
              type="checkbox"
              id="skill3"
              value="Python"
              onChange={handleChange}
            />
          </label>
        </div>

        <label htmlFor="password">PASSWORD</label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
        <input
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
