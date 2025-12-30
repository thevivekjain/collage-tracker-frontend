import { useEffect, useState } from "react";
import api from "../api/axios";
import "./ManageStaff.css";

function ManageStaff() {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Load all staff (exclude admin)
  const loadStaffs = async () => {
    try {
      const res = await api.get("/admin/staffs");

      // ❌ REMOVE ADMIN FROM LIST (extra safety)
      const filtered = res.data.filter(
        (user) => user.role !== "admin"
      );

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

  // 🔴 Disable staff
  const disableUser = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to DISABLE this staff?"
    );
    if (!confirm) return;

    try {
      await api.patch(`/admin/disable/${id}`);

      setStaffs((prev) =>
        prev.map((u) =>
          u._id === id ? { ...u, isActive: false } : u
        )
      );
    } catch {
      alert("Failed to disable staff");
    }
  };

  // 🟢 Enable staff
  const enableUser = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to ENABLE this staff?"
    );
    if (!confirm) return;

    try {
      await api.patch(`/admin/enable/${id}`);

      setStaffs((prev) =>
        prev.map((u) =>
          u._id === id ? { ...u, isActive: true } : u
        )
      );
    } catch {
      alert("Failed to enable staff");
    }
  };

  return (
    <div className="manage-staff-page">
      <h2>Manage Staff</h2>

      {loading && <p>Loading staff...</p>}

      {!loading && staffs.length === 0 && (
        <p>No staff found</p>
      )}

      {!loading &&
        staffs.map((user) => (
          <div className="staff-item" key={user._id}>
            <div className="staff-info">
              <b>{user.name}</b>
              <span className="staff-role">
                ({user.role})
              </span>
            </div>

            <div className="staff-action">
              {user.isActive ? (
                <button
                  className="disable-btn"
                  onClick={() => disableUser(user._id)}
                >
                  Disable
                </button>
              ) : (
                <button
                  className="enable-btn"
                  onClick={() => enableUser(user._id)}
                >
                  Enable
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export default ManageStaff;
