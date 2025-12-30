import { useEffect, useState } from "react";
import api from "../api/axios";
import UploadDocument from "./UploadDocument";
import "./AssignedRequests.css";

function AssignedRequests() {
  const [requests, setRequests] = useState([]);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectId, setRejectId] = useState(null);
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");

  // 🔄 Load assigned requests
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

  // ✅ Approve request (NOT for office)
  const approveRequest = async (id) => {
    try {
      await api.patch(`/requests/approve/${id}`);
      setRequests(prev => prev.filter(r => r._id !== id));
      alert("Request approved & forwarded");
    } catch {
      alert("Error approving request");
    }
  };

  // ❌ Reject request (all roles incl. office)
  const rejectRequest = async () => {
    try {
      await api.patch(`/requests/reject/${rejectId}`, {
        reason: rejectReason
      });

      setRequests(prev =>
        prev.filter(r => r._id !== rejectId)
      );

      setRejectId(null);
      setRejectReason("");
      alert("Request rejected");
    } catch {
      alert("Rejection failed");
    }
  };

  return (
    <div className="assigned-page">
      <h2>Assigned Requests</h2>

      {loading && <p className="loader">Loading requests...</p>}

      {!loading && requests.length === 0 && (
        <p>No requests assigned</p>
      )}

      {!loading &&
        requests.map((req) => (
          <div className="assigned-card" key={req._id}>
            <p><strong>{req.documentType}</strong></p>
            <p><strong>Purpose:</strong> {req.purpose}</p>
            <p>Student: {req.studentId?.name}</p>

            <span className={`badge ${req.status.toLowerCase()}`}>
              {req.status}
            </span>

            <p>Current Step: {req.currentStep}</p>

            {/* ✅ APPROVE (ONLY NON-OFFICE) */}
            {req.status !== "Completed" &&
              role !== "office" && (
                <div className="action-row">
                  <button onClick={() => approveRequest(req._id)}>
                    Approve & Forward
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() => setRejectId(req._id)}
                  >
                    Reject
                  </button>
                </div>
              )}

            {/* ❌ OFFICE REJECT (NO APPROVE) */}
            {role === "office" &&
              req.currentStep === "office" && (
                <div className="action-row">
                  <button
                    className="reject-btn"
                    onClick={() => setRejectId(req._id)}
                  >
                    Reject
                  </button>
                </div>
              )}

            {/* 📄 UPLOAD PDF (ONLY OFFICE) */}
            {role === "office" &&
              req.currentStep === "office" && (
                <UploadDocument
                  requestId={req._id}
                  onUploaded={(id) =>
                    setRequests(prev =>
                      prev.filter(r => r._id !== id)
                    )
                  }
                />
              )}
          </div>
        ))}

      {/* ❌ REJECT MODAL */}
      {rejectId && (
        <div
          className="reject-modal"
          onClick={() => setRejectId(null)}
        >
          <div
            className="reject-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Reject Request</h3>

            <textarea
              placeholder="Enter rejection reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />

            <div className="reject-actions">
              <button
                className="confirm"
                onClick={rejectRequest}
              >
                Confirm Reject
              </button>

              <button
                className="cancel"
                onClick={() => setRejectId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignedRequests;
