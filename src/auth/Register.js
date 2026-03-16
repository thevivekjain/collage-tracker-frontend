import { useState } from "react";
import api from "../api/axios";
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaGraduationCap } from "react-icons/fa";
import loginImg from "../assets/x.jpeg";
import "./Login.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", { name, email, password });
      alert("Registration successful. Please login.");
      window.location.href = "/";
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-split-card">
        {/* Left Side */}
        <div className="auth-image-side" style={{ backgroundImage: `url(${loginImg})` }}>
          <div className="image-overlay">
            <div className="overlay-content">
              <FaGraduationCap className="overlay-icon" />
              <h3>Join Us</h3>
              <p>Simplify your requests and track them in real-time.</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="auth-form-side">
          <div className="form-header">
            <FaUserPlus className="form-avatar" />
            <h2>Student Register</h2>
            <p>Enter your details to get started</p>
          </div>

          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="College Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="auth-btn" onClick={handleRegister}>
            Register Now
          </button>

          <p className="auth-footer-link">
            Already registered? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;