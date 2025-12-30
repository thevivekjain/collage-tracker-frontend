import { useState, useEffect } from "react";
import api from "../api/axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ AUTO REDIRECT IF ALREADY LOGGED IN
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      if (role === "student") {
        window.location.replace("/student/my-requests");
      } else if (
        role === "clerk" ||
        role === "hod" ||
        role === "office" ||
        role === "accounts" ||
        role === "principal"
      ) {
        window.location.replace("/staff/assigned");
      } else if (role === "admin") {
        window.location.replace("/admin/dashboard");
      }
    }
  }, []);

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      // Save token & role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);

      const role = res.data.user.role;

      if (role === "student") {
        window.location.href = "/student/my-requests";
      } else if (
        role === "clerk" ||
        role === "hod" ||
        role === "office" ||
        role === "accounts" ||
        role === "principal"
      ) {
        window.location.href = "/staff/assigned";
      } else if (role === "admin") {
        window.location.href = "/admin/dashboard";
      }

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>College Tracker</h2>
        <p className="login-subtitle">Login to continue</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="login-link">
          New student? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
