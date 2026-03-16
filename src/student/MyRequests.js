import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { FaFileAlt, FaHistory, FaDownload, FaEye, FaExclamationCircle, FaInfoCircle } from "react-icons/fa";
import "./MyRequests.css";

function MyRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    api
      .get("/requests/my")
      .then((res) => setRequests(res.data))
      .catch(() => alert("Failed to load requests"));
  }, []);

  return (
    <div className="mr-container">
      <div className="mr-header">
        <h2 className="mr-title"><FaHistory className="mr-icon-blue" /> My Requests</h2>
        <p className="mr-subtitle">Track the status of your document applications</p>
      </div>

      {requests.length === 0 ? (
        <div className="mr-empty">
          <FaInfoCircle />
          <p>No requests found in your account.</p>
        </div>
      ) : (
        <div className="mr-list">
          {requests.map((req) => (
            <div className="mr-card" key={req._id}>
              {/* Status Badge at Top Right */}
              <span className={`mr-badge ${req.status.toLowerCase()}`}>
                {req.status}
              </span>

              <div className="mr-card-content">
                <div className="mr-doc-info">
                  <div className="mr-avatar-doc">
                    <FaFileAlt />
                  </div>
                  <div>
                    <h4 className="mr-doc-type">{req.documentType}</h4>
                    <p className="mr-purpose"><strong>Purpose:</strong> {req.purpose}</p>
                  </div>
                </div>

                <div className="mr-step-info">
                  <span className="mr-step-label">Current Stage:</span>
                  <span className="mr-step-value">{req.currentStep}</span>
                </div>

                {req.status === "Rejected" && (
                  <div className="mr-reject-box">
                    <FaExclamationCircle className="mr-reject-icon" />
                    <div className="mr-reject-text">
                      <strong>Reason:</strong>{" "}
                      {req.history
                        ?.slice()
                        .reverse()
                        .find((h) => h.status === "Rejected" && h.reason)?.reason || "Reason not provided"}
                    </div>
                  </div>
                )}

                <div className="mr-footer">
                  <Link to={`/student/timeline/${req._id}`} className="mr-timeline-link">
                    View Full Timeline →
                  </Link>

                  {req.issuedDocument && (
                    <div className="mr-download-section">
                      <p className="mr-success-msg">📄 Document is ready for download</p>
                      <div className="mr-btn-group">
                        <a href={req.issuedDocument} target="_blank" rel="noreferrer" className="mr-btn mr-btn-download">
                          <FaDownload /> Download
                        </a>
                        <a
                          href={`https://docs.google.com/gview?url=${encodeURIComponent(req.issuedDocument)}&embedded=true`}
                          target="_blank" rel="noreferrer" className="mr-btn mr-btn-view"
                        >
                          <FaEye /> View
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRequests;