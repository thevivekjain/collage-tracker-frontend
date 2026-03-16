import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaUserCircle, FaSignOutAlt, FaShieldAlt } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const menuRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/", { replace: true });
    }
  };

  return (
    <nav className="ct-navbar">
      <div className="ct-nav-container">
        {/* LEFT: Logo */}
        <h3 className="ct-logo" onClick={() => navigate("/")}>
          College<span>Tracker</span>
        </h3>

        {/* MIDDLE: Dynamic Links */}
        <div ref={menuRef} className={`ct-nav-links ${menuOpen ? "ct-open" : ""}`}>
          {!role ? (
            <>
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <a href="/about" onClick={() => setMenuOpen(false)}>About Us</a>
              <a href="/contact" onClick={() => setMenuOpen(false)}>Contact Us</a>
              <button className="ct-signin-btn ct-mobile-only" onClick={() => navigate("/login")}>Sign In</button>
            </>
          ) : (
            <>
              {role === "student" && (
                <>
                  <span onClick={() => {navigate("/student/my-requests"); setMenuOpen(false)}}>My Requests</span>
                  <span onClick={() => {navigate("/student/create"); setMenuOpen(false)}}>Create Request</span>
                </>
              )}
              {["clerk", "hod", "accounts", "principal"].includes(role) && (
                <span onClick={() => {navigate("/staff/assigned"); setMenuOpen(false)}}>Assigned Requests</span>
              )}
              {role === "office" && (
                <>
                  <span onClick={() => {navigate("/staff/assigned"); setMenuOpen(false)}}>Assigned Requests</span>
                  <span onClick={() => {navigate("/office/all-requests"); setMenuOpen(false)}}>Completed Requests</span>
                </>
              )}
              {role === "admin" && (
                <>
                  <span onClick={() => {navigate("/admin/dashboard"); setMenuOpen(false)}}>Dashboard</span>
                  <span onClick={() => {navigate("/admin/create-staff"); setMenuOpen(false)}}>Create Staff</span>
                  <span onClick={() => {navigate("/admin/manage-staff"); setMenuOpen(false)}}>Manage Staff</span>
                  <span onClick={() => {navigate("/admin/manage-students"); setMenuOpen(false)}}>Manage Students</span>
                </>
              )}
            </>
          )}
        </div>

        {/* RIGHT: Auth/Profile */}
        <div className="ct-nav-right">
          {!role ? (
            <button className="ct-signin-btn ct-desktop-only" onClick={() => navigate("/login")}>
              Sign In
            </button>
          ) : (
            <div ref={profileRef} className="ct-profile-wrapper">
              <div className="ct-profile-box" onClick={() => setProfileOpen(!profileOpen)}>
                <FaUserCircle className="ct-user-icon" />
                <span className="ct-profile-name">{name || "User"}</span>
              </div>

              {profileOpen && (
                <div className="ct-profile-dropdown">
                  <div className="ct-dropdown-header">
                    <FaShieldAlt className="ct-role-icon" />
                    <div className="ct-user-meta">
                      <p className="ct-user-n">{name}</p>
                      <p className="ct-user-r">{role}</p>
                    </div>
                  </div>
                  <div className="ct-divider"></div>
                  <button className="ct-logout-btn" onClick={logout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="ct-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX /> : <HiMenuAlt3 />}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;