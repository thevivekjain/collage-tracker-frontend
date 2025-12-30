import { useEffect, useState } from "react";
import api from "../api/axios";
import "./ManageStudents.css";

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔄 Load students
  useEffect(() => {
    api.get("/admin/students")
      .then(res => setStudents(res.data))
      .catch(() => alert("Failed to load students"))
      .finally(() => setLoading(false));
  }, []);

  // 🔁 Enable / Disable student
  const toggleStatus = async (id, isActive) => {
  const confirmMsg = isActive
    ? "Are you sure you want to DISABLE this student?"
    : "Are you sure you want to ENABLE this student?";

  if (!window.confirm(confirmMsg)) return;

  const url = isActive
    ? `/admin/student/disable/${id}`
    : `/admin/student/enable/${id}`;

  await api.patch(url);

  setStudents(prev =>
    prev.map(s =>
      s._id === id ? { ...s, isActive: !isActive } : s
    )
  );
};


  // 🔍 Search filter
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="manage-page">
      <div className="manage-header">
        <h2>Manage Students</h2>

        <input
          className="search-box"
          placeholder="Search student..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {loading && <p>Loading students...</p>}

      {!loading && filtered.length === 0 && (
        <p>No students found</p>
      )}

      <div className="student-list">
        {filtered.map(s => (
          <div className="student-card" key={s._id}>
            <div>
              <b>{s.name}</b>
              <p>{s.email}</p>
            </div>

            <button
              className={s.isActive ? "disable" : "enable"}
              onClick={() => toggleStatus(s._id, s.isActive)}
            >
              {s.isActive ? "Disable" : "Enable"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageStudents;
