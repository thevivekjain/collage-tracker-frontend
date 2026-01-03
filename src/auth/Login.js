import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ AUTO REDIRECT IF ALREADY LOGGED IN
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      if (role === "student") {
        navigate("/student/my-requests", { replace: true });
      } else if (
        role === "clerk" ||
        role === "hod" ||
        role === "office" ||
        role === "accounts" ||
        role === "principal"
      ) {
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

      if (role === "student") {
        navigate("/student/my-requests", { replace: true });
      } else if (
        role === "clerk" ||
        role === "hod" ||
        role === "office" ||
        role === "accounts" ||
        role === "principal"
      ) {
        navigate("/staff/assigned", { replace: true });
      } else if (role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      }

    } catch (error) {
      alert(error.response?.data?.message || "Server error");
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
