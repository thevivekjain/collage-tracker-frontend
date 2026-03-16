import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { FaArrowLeft, FaCheckCircle, FaClock, FaExclamationTriangle, FaUserTie } from "react-icons/fa";
import "./Timeline.css";

function Timeline() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [timeline, setTimeline] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/requests/timeline/${id}`)
      .then((res) => {
        setTimeline(res.data);
      })
      .catch((err) => {
        alert("Failed to load timeline");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="tm-loader">Updating Timeline...</div>;
  if (!timeline) return <div className="tm-error">No timeline details found.</div>;

  return (
    <div className="tm-container">
      {/* Back Button & Header */}
      <button className="tm-back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>

      <div className="tm-main-card">
        <div className="tm-header">
          <h2>{timeline.documentType}</h2>
          <div className="tm-summary">
            <span className={`tm-status-tag ${timeline.status.toLowerCase()}`}>
              {timeline.status}
            </span>
            <p><strong>Current Step:</strong> {timeline.currentStep}</p>
          </div>
        </div>

        {/* The Actual Timeline Tracking Section */}
        <div className="tm-tracking-container">
          {timeline.history.map((h, index) => (
            <div key={index} className="tm-step-wrapper">
              {/* Left Side: Icon & Line */}
              <div className="tm-line-box">
                <div className={`tm-dot ${h.status === 'Rejected' ? 'dot-red' : 'dot-green'}`}>
                  {h.status === 'Rejected' ? <FaExclamationTriangle /> : <FaCheckCircle />}
                </div>
                {index !== timeline.history.length - 1 && <div className="tm-line"></div>}
              </div>

              {/* Right Side: Inner Card */}
              <div className="tm-inner-card">
                <div className="tm-inner-header">
                  <span className="tm-role">
                    <FaUserTie className="tm-small-icon" /> {h.role.toUpperCase()}
                  </span>
                  <span className="tm-date">
                    {new Date(h.actionDate).toLocaleDateString()} | {new Date(h.actionDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="tm-inner-body">
                  <p className="tm-action-status">
                    Action: <strong>{h.status}</strong>
                  </p>

                  {h.reason && (
                    <div className="tm-reject-reason">
                      <strong>Remark:</strong> {h.reason}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Timeline;