import { useState, useRef, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const menuRef = useRef(null);
  const profileRef = useRef(null);

  // 🔒 Close menu / profile on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ FINAL LOGOUT (BACK BUTTON FIX)
  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      window.location.replace("/login");
    }
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <h3 className="logo">College Tracker</h3>

      {/* HAMBURGER */}
      {role && (
        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      )}

      {/* NAV LINKS */}
      {role && (
        <div
          ref={menuRef}
          className={`nav-links ${menuOpen ? "open" : ""}`}
        >
          {/* STUDENT */}
          {role === "student" && (
            <>
              <a href="/student/create">Create Request</a>
              <a href="/student/my-requests">My Requests</a>
            </>
          )}

          {/* STAFF */}
          {(role === "clerk" ||
            role === "hod" ||
            role === "accounts" ||
            role === "principal") && (
            <a href="/staff/assigned">Assigned Requests</a>
          )}

          {/* OFFICE */}
          {role === "office" && (
            <>
              <a href="/staff/assigned">Assigned Requests</a>
              <a href="/office/all-requests">Completed Request</a>
            </>
          )}

          {/* ADMIN */}
          {role === "admin" && (
            <>
              <a href="/admin/dashboard">Dashboard</a>
              <a href="/admin/create-staff">Create Staff</a>
              <a href="/admin/manage-staff">Manage Staff</a>
              <a href="/admin/manage-students">Manage Students</a>
            </>
          )}
        </div>
      )}

      {/* PROFILE */}
      {role && (
        <div ref={profileRef} className="profile-wrapper">
          <div
            className="profile-box"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="profile-icon">
              {name ? name.charAt(0).toUpperCase() : "U"}
            </div>
            <span className="profile-name">{name}</span>
          </div>

          {profileOpen && (
            <div className="profile-dropdown">
              <p className="profile-role">{role}</p>
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
