import React, { useState } from "react";
import api from "../api/axios";
import { FaUserPlus, FaUser, FaEnvelope, FaLock, FaUserTag } from "react-icons/fa";
import "./CreateStaff.css";

function CreateStaff() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    const { name, email, password, role } = form;

    if (!name || !email || !password || !role) {
      alert("All fields are required");
      return;
    }

    try {
      await api.post("/auth/register-staff", form);
      alert("Staff registered successfully");

      setForm({
        name: "",
        email: "",
        password: "",
        role: ""
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to register staff"
      );
    }
  };

  return (
    <div className="cs-page-container">
      <div className="cs-form-card">
        <div className="cs-form-header">
          <div className="cs-icon-circle">
            <FaUserPlus />
          </div>
          <h2>Create Staff</h2>
          <p>Register a new member to the management system</p>
        </div>

        <div className="cs-form-body">
          <div className="cs-input-group">
            <FaUser className="cs-input-icon" />
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="cs-input-group">
            <FaEnvelope className="cs-input-icon" />
            <input
              name="email"
              type="email"
              placeholder="Official Email Address"
              value={form.email}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="cs-input-group">
            <FaLock className="cs-input-icon" />
            <input
              name="password"
              type="password"
              placeholder="Temporary Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="cs-input-group">
            <FaUserTag className="cs-input-icon" />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="">Select Staff Role</option>
              <option value="clerk">Clerk</option>
              <option value="hod">HOD</option>
              <option value="office">Office Staff</option>
              <option value="accounts">Accounts</option>
              <option value="principal">Principal</option>
            </select>
          </div>

          <button className="cs-submit-btn" onClick={handleSubmit}>
            Create User Account
          </button>
        </div>
      </div>
       
    </div>
    
  );
}

export default CreateStaff;