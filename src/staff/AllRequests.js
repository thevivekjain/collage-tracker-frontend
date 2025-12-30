import { useEffect, useState } from "react";
import api from "../api/axios";
import "./AllRequests.css";

function AllRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // ✅ SEARCH STATE

  useEffect(() => {
    api
      .get("/requests/all")
      .then((res) => setRequests(res.data))
      .catch(() => alert("Failed to load requests"))
      .finally(() => setLoading(false));
  }, []);

  // ✅ SEARCH FILTER
  const filteredRequests = requests.filter(
    (req) =>
      req.documentType
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      req.studentId?.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="all-requests-page">
      {/* HEADER + SEARCH */}
      <div className="all-header">
        <h2>Completed</h2>

        <input
          className="search-input"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <p>Loading records...</p>}

      {!loading && filteredRequests.length === 0 && (
        <p>No records found</p>
      )}

      {!loading &&
        filteredRequests.map((req) => (
          <div className="all-card" key={req._id}>
            <p><b>{req.documentType}</b></p>
            <p>Student: {req.studentId?.name}</p>
            <p>Purpose: {req.purpose}</p>

            <span className={`badge ${req.status.toLowerCase()}`}>
              {req.status}
            </span>

            {req.issuedDocument && (
              <a
                href={`http://localhost:5000/${req.issuedDocument}`}
                target="_blank"
                rel="noreferrer"
                className="download-btn"
              >
                Download PDF
              </a>
            )}
          </div>
        ))}
    </div>
  );
}

export default AllRequests;
