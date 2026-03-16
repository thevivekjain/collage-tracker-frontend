import { useEffect, useState } from "react";
import api from "../api/axios";
import UploadDocument from "./UploadDocument";
import { FaTasks, FaUser, FaInfoCircle, FaCheck, FaTimes, FaFileAlt, FaPaperPlane } from "react-icons/fa";
import "./AssignedRequests.css";

function AssignedRequests() {
  const [requests, setRequests] = useState([]);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectId, setRejectId] = useState(null);
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");

  const loadRequests = async () => {
    try {
      setLoading(true);
      const res = await api.get("/requests/assigned");
      setRequests(res.data);
    } catch {
      alert("Failed to load assigned requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const approveRequest = async (id) => {
    try {
      await api.patch(`/requests/approve/${id}`);
      setRequests(prev => prev.filter(r => r._id !== id));
      alert("Request approved & forwarded");
    } catch {
      alert("Error approving request");
    }
  };

  const rejectRequest = async () => {
    if (!rejectReason.trim()) return alert("Please provide a reason");
    try {
      await api.patch(`/requests/reject/${rejectId}`, { reason: rejectReason });
      setRequests(prev => prev.filter(r => r._id !== rejectId));
      setRejectId(null);
      setRejectReason("");
      alert("Request rejected");
    } catch {
      alert("Rejection failed");
    }
  };

  return (
    <div className="ar-container">
      <div className="ar-header">
        <h2><FaTasks className="ar-icon-main" /> Assigned Requests</h2>
        <p>Review and process student applications</p>
      </div>

      {loading ? (
        <div className="ar-loader">Loading pending tasks...</div>
      ) : requests.length === 0 ? (
        <div className="ar-empty">
          <FaInfoCircle />
          <p>No requests assigned to you right now.</p>
        </div>
      ) : (
        <div className="ar-grid">
          {requests.map((req) => (
            <div className="ar-outer-card" key={req._id}>
              {/* Status Badge Top Right */}
              <span className={`ar-badge ${req.status.toLowerCase()}`}>
                {req.status}
              </span>

              <div className="ar-doc-header">
                <FaFileAlt className="ar-doc-icon" />
                <h3>{req.documentType}</h3>
              </div>

              {/* Inner Student Info Card */}
              <div className="ar-inner-info">
                <div className="ar-info-row">
                  <FaUser className="ar-small-icon" />
                  <span><strong>Student:</strong> {req.studentId?.name || "Unknown"}</span>
                </div>
                <div className="ar-info-row">
                  <FaInfoCircle className="ar-small-icon" />
                  <span><strong>Purpose:</strong> {req.purpose}</span>
                </div>
                <div className="ar-info-row">
                  <FaPaperPlane className="ar-small-icon" />
                  <span><strong>Current Stage:</strong> {req.currentStep}</span>
                </div>
              </div>

              <div className="ar-actions">
                {/* Approve Button (Not for Office) */}
                {req.status !== "Completed" && role !== "office" && (
                  <button className="ar-btn ar-btn-approve" onClick={() => approveRequest(req._id)}>
                    <FaCheck /> Approve & Forward
                  </button>
                )}

                {/* Reject Button (Always available for active tasks) */}
                <button className="ar-btn ar-btn-reject" onClick={() => setRejectId(req._id)}>
                  <FaTimes /> Reject
                </button>

                {/* Upload Section (Only for Office) */}
                {role === "office" && req.currentStep === "office" && (
                  <div className="ar-upload-wrapper">
                    <UploadDocument
                      requestId={req._id}
                      onUploaded={(id) => setRequests(prev => prev.filter(r => r._id !== id))}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      {rejectId && (
        <div className="ar-modal-overlay" onClick={() => setRejectId(null)}>
          <div className="ar-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="ar-modal-header">
              <h3>Reason for Rejection</h3>
              <p>Please explain why this request is being rejected.</p>
            </div>
            <textarea
              placeholder="e.g., Document is unclear, data mismatch..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="ar-modal-footer">
              <button className="ar-btn-secondary" onClick={() => setRejectId(null)}>Cancel</button>
              <button className="ar-btn-confirm" onClick={rejectRequest}>Confirm Reject</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignedRequests;