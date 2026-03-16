import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { FaSearch, FaUserShield, FaUserCheck, FaUserTimes, FaUsers } from "react-icons/fa";
import "./ManageStaff.css";

function ManageStaff() {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loadStaffs = async () => {
    try {
      const res = await api.get("/admin/staffs");
      const filtered = res.data.filter((user) => user.role !== "admin");
      setStaffs(filtered);
    } catch (error) {
      alert("Failed to load staff list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaffs();
  }, []);

  const disableUser = async (id) => {
    if (!window.confirm("Are you sure you want to DISABLE this staff?")) return;
    try {
      await api.patch(`/admin/disable/${id}`);
      setStaffs((prev) => prev.map((u) => (u._id === id ? { ...u, isActive: false } : u)));
    } catch {
      alert("Failed to disable staff");
    }
  };

  const enableUser = async (id) => {
    if (!window.confirm("Are you sure you want to ENABLE this staff?")) return;
    try {
      await api.patch(`/admin/enable/${id}`);
      setStaffs((prev) => prev.map((u) => (u._id === id ? { ...u, isActive: true } : u)));
    } catch {
      alert("Failed to enable staff");
    }
  };

  const filteredStaff = staffs.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ms-container">
      <div className="ms-header">
        <div className="ms-title-section">
          <h2><FaUsers className="ms-title-icon" /> Manage Staff</h2>
          <p>Total active staff members: {staffs.filter(s => s.isActive).length}</p>
        </div>

        <div className="ms-search-container">
          <div className="ms-search-box">
            <FaSearch className="ms-search-icon" />
            <input 
              type="text" 
              placeholder="Search by name or role..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ms-search-input"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="ms-loader">Fetching Staff Records...</div>
      ) : (
        <div className="ms-grid">
          {filteredStaff.length === 0 ? (
            <div className="ms-no-data">No staff members found matching your search.</div>
          ) : (
            filteredStaff.map((user) => (
              <div className={`ms-card ${!user.isActive ? 'ms-disabled' : ''}`} key={user._id}>
                {/* Role Badge shifted to Top Right */}
                <span className="ms-role-badge-top">{user.role}</span>
                
                <div className="ms-card-content">
                  <div className="ms-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="ms-details">
                    <div className="ms-name-row">
                      <h4>{user.name}</h4>
                      {user.role === 'hod' && <FaUserShield className="ms-badge-icon" />}
                    </div>
                    <p className="ms-email-text">{user.email || 'No email provided'}</p>
                  </div>
                </div>

                <div className="ms-actions">
                  {user.isActive ? (
                    <button className="ms-btn ms-disable-btn" onClick={() => disableUser(user._id)}>
                      <FaUserTimes /> Disable Account
                    </button>
                  ) : (
                    <button className="ms-btn ms-enable-btn" onClick={() => enableUser(user._id)}>
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

export default ManageStaff;