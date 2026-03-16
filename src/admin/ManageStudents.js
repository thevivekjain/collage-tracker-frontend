import React, { useEffect, useState } from "react";
import api from "../api/axios";
// Font Awesome 5 icons
import { FaSearch, FaUsers } from "react-icons/fa";

// Font Awesome 6 icons
import { FaUserGraduate, FaUserCheck, FaUserXmark } from "react-icons/fa6";import "./ManageStudents.css";

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    api.get("/admin/students")
      .then(res => setStudents(res.data))
      .catch(() => alert("Failed to load student list"))
      .finally(() => setLoading(false));
  }, []);

  const toggleStatus = async (id, isActive) => {
    const confirmMsg = isActive
      ? "Are you sure you want to DISABLE this student?"
      : "Are you sure you want to ENABLE this student?";

    if (!window.confirm(confirmMsg)) return;

    try {
      const url = isActive
        ? `/admin/student/disable/${id}`
        : `/admin/student/enable/${id}`;

      await api.patch(url);

      setStudents(prev =>
        prev.map(s =>
          s._id === id ? { ...s, isActive: !isActive } : s
        )
      );
    } catch {
      alert("Action failed. Please try again.");
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="m-std-container">
      <div className="m-std-header">
        <div className="m-std-title-section">
          <h2><FaUsers className="m-std-title-icon" /> Manage Students</h2>
          <p>Total active students: {students.filter(s => s.isActive).length}</p>
        </div>

        <div className="m-std-search-container">
          <div className="m-std-search-box">
            <FaSearch className="m-std-search-icon" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="m-std-search-input"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="m-std-loader">Fetching Student Records...</div>
      ) : (
        <div className="m-std-grid">
          {filteredStudents.length === 0 ? (
            <div className="m-std-no-data">No students found matching your search.</div>
          ) : (
            filteredStudents.map((user) => (
              <div className={`m-std-card ${!user.isActive ? 'm-std-disabled' : ''}`} key={user._id}>
                {/* Status Badge Top Right */}
                <span className={`m-std-role-badge-top ${user.isActive ? 'active-badge' : 'inactive-badge'}`}>
                  {user.isActive ? "Active" : "Disabled"}
                </span>
                
                <div className="m-std-card-content">
                  <div className="m-std-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="m-std-details">
                    <div className="m-std-name-row">
                      <h4>{user.name}</h4>
                      <FaUserGraduate className="m-std-badge-icon" />
                    </div>
                    <p className="m-std-email-text">{user.email || 'No email provided'}</p>
                  </div>
                </div>

                <div className="m-std-actions">
                  {user.isActive ? (
                    <button className="m-std-btn m-std-disable-btn" onClick={() => toggleStatus(user._id, user.isActive)}>
                      <FaUserXmark /> Disable Account
                    </button>
                  ) : (
                    <button className="m-std-btn m-std-enable-btn" onClick={() => toggleStatus(user._id, user.isActive)}>
                      <FaUserCheck /> Enable Account
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ManageStudents;