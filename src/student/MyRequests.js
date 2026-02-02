import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "./MyRequests.css";

function MyRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    api
      .get("/requests/my")
      .then((res) => setRequests(res.data))
      .catch(() => alert("Failed to load requests"));
  }, []);

  useEffect(()=>{
    console.log(requests)
  },[requests])

  return (
    <div className="requests-page">
      <h2 className="nameline">My Requests</h2>

      {requests.length === 0 && <p>No requests found</p>}

      {requests.map((req) => (
        <div className="request-card" key={req._id}>
          <p><strong>{req.documentType}</strong></p>
          <p><strong>Purpose:</strong> {req.purpose}</p>

          <span className={`badge ${req.status.toLowerCase()}`}>
            {req.status}
          </span>

          <p>Current Step: {req.currentStep}</p>

          {req.status === "Rejected" && (
            <p className="reject-reason">
              <strong>Rejected Reason:</strong>{" "}
              {
                req.history
                  ?.slice()
                  .reverse()
                  .find(
                    (h) => h.status === "Rejected" && h.reason
                  )?.reason || "Reason not provided"
              }
            </p>
          )}

          <Link
            to={`/student/timeline/${req._id}`}
            className="timeline-link"
          >
            View Timeline
          </Link>

          {req.issuedDocument && (
            <div className="download-section">
              <p className="download-text">
                📄 Your PDF has been uploaded. You can now download it from here.
              </p>

        
              <a
                href={req.issuedDocument}
                
                target="_blank"
                rel="noreferrer"
                className="download-btn"
              >
                Download PDF
              </a>
              <a
                href={`https://docs.google.com/gview?url=${encodeURIComponent(req.issuedDocument)}&embedded=true`}
                
                target="_blank"
                rel="noreferrer"
                className="download-btn"
              >
                View PDF
              </a>
            </div>
          )}

          
        </div>
      ))}
    </div>
  );
}

export default MyRequests;
