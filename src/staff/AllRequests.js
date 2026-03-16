import { useEffect, useState } from "react";
import api from "../api/axios";
import { FaSearch, FaHistory, FaDownload, FaUserGraduate, FaFileInvoice, FaInfoCircle } from "react-icons/fa";
import "./AllRequests.css";

function AllRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get("/requests/all")
      .then((res) => setRequests(res.data))
      .catch(() => alert("Failed to load requests"))
      .finally(() => setLoading(false));
  }, []);

  const filteredRequests = requests.filter(
    (req) =>
      req.documentType.toLowerCase().includes(search.toLowerCase()) ||
      req.studentId?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ar-page-container">
      {/* Header Section */}
      <div className="ar-top-section">
        <div className="ar-title-area">
          <h2><FaHistory className="ar-icon-primary" /> Request Archive</h2>
          <p>History of all processed and completed documents</p>
        </div>

        {/* Stats & Search */}
        <div className="ar-controls">
          <div className="ar-stat-chip">
            <span className="ar-stat-label">Total Records:</span>
            <span className="ar-stat-count">{filteredRequests.length}</span>
          </div>
          
          <div className="ar-search-wrapper">
            <FaSearch className="ar-search-icon" />
            <input
              className="ar-search-input"
              placeholder="Search student or document..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="ar-state-msg">Loading archive records...</div>
      ) : filteredRequests.length === 0 ? (
        <div className="ar-empty-state">
          <FaInfoCircle />
          <p>No matching records found.</p>
        </div>
      ) : (
        <div className="ar-records-grid">
          {filteredRequests.map((req) => (
            <div className="ar-record-card" key={req._id}>
              {/* Top Right Status */}
              <span className={`ar-status-badge ${req.status.toLowerCase()}`}>
                {req.status}
              </span>

              <div className="ar-card-body">
                <div className="ar-doc-info">
                  <div className="ar-doc-icon-box">
                    <FaFileInvoice />
                  </div>
                  <div>
                    <h4 className="ar-doc-name">{req.documentType}</h4>
                    <p className="ar-purpose-text"><b>Purpose:</b> {req.purpose}</p>
                  </div>
                </div>

                <div className="ar-student-box">
                  <FaUserGraduate className="ar-small-icon" />
                  <span>{req.studentId?.name || "Unknown Student"}</span>
                </div>

                {req.issuedDocument && (
                  <div className="ar-action-footer">
                    <a
                      href={req.issuedDocument}
                      target="_blank"
                      rel="noreferrer"
                      className="ar-download-link"
                    >
                      <FaDownload /> Download Document
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllRequests;