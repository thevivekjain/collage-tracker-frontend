import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const menuRef = useRef(null);
  const profileRef = useRef(null);

  // Close menu on outside click
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

  // LOGOUT (BACK SAFE)
  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/", { replace: true });
    }
  };

  return (
    <nav className="navbar">
      <h3 className="logo">College Tracker</h3>

      {role && (
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      )}

      {role && (
        <div
          ref={menuRef}
          className={`nav-links ${menuOpen ? "open" : ""}`}
        >
          {role === "student" && (
            <>
              <span onClick={() => navigate("/student/create")}>Create Request</span>
              <span onClick={() => navigate("/student/my-requests")}>My Requests</span>
            </>
          )}

          {(role === "clerk" ||
            role === "hod" ||
            role === "accounts" ||
            role === "principal") && (
            <span onClick={() => navigate("/staff/assigned")}>
              Assigned Requests
            </span>
          )}

          {role === "office" && (
            <>
              <span onClick={() => navigate("/staff/assigned")}>
                Assigned Requests
              </span>
              <span onClick={() => navigate("/office/all-requests")}>
                Completed Requests
              </span>
            </>
          )}

          {role === "admin" && (
            <>
              <span onClick={() => navigate("/admin/dashboard")}>Dashboard</span>
              <span onClick={() => navigate("/admin/create-staff")}>Create Staff</span>
              <span onClick={() => navigate("/admin/manage-staff")}>Manage Staff</span>
              <span onClick={() => navigate("/admin/manage-students")}>Manage Students</span>
            </>
          )}
        </div>
      )}

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
