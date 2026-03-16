import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { FaEnvelope, FaLock, FaUserCircle, FaGraduationCap } from "react-icons/fa";
import loginImg from "../assets/x.jpeg";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      if (role === "student") {
        navigate("/student/my-requests", { replace: true });
      } else if (["clerk", "hod", "office", "accounts", "principal"].includes(role)) {
        navigate("/staff/assigned", { replace: true });
      } else if (role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      }
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);

      const role = res.data.user.role;
      if (role === "student") navigate("/student/my-requests", { replace: true });
      else if (["clerk", "hod", "office", "accounts", "principal"].includes(role)) navigate("/staff/assigned", { replace: true });
      else if (role === "admin") navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      alert(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-split-card">
        {/* Left Part: Image Section (1/2) */}
        <div className="auth-image-side" style={{ backgroundImage: `url(${loginImg})` }}>
          <div className="image-overlay">
            <div className="overlay-content">
              <FaGraduationCap className="overlay-icon" />
              <h3>College Tracker</h3>
              <p>Your digital gateway to seamless campus administration.</p>
            </div>
          </div>
        </div>

        {/* Right Part: Form Section (1/2) */}
        <div className="auth-form-side">
          <div className="form-header">
            <FaUserCircle className="form-avatar" />
            <h2>Welcome Back</h2>
            <p>Login to your account to continue</p>
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

          <button className="auth-btn" onClick={handleLogin}>
            Sign In
          </button>

          <p className="auth-footer-link">
            New student? <a href="/register">Create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;